# 使用次数与Token使用量授权

## 需求概述

无极平台需要对小组内成员的智能体使用进行授权限制，包括：
1. 进阶类智能体使用次数限制（支持日、周、月三种周期配置）
2. 每日所有智能体总Token使用量限制

### 版本变更记录

| 版本 | 日期 | 变更内容 |
|-----|------|---------|
| v1.0 | 2025-01-01 | 初始版本，支持月度使用次数限制 |
| v1.1 | 2025-12-18 | 新增周期配置功能，支持日、周、月三种频率 |

## 需求拆解

### 需求1：进阶类智能体使用次数授权限制（支持多周期配置）

#### 功能描述
对小组内成员可使用进阶类智能体的次数进行授权限制，支持按**日、周、月**三种周期进行灵活配置。

#### 关键要素
- **限制对象**：小组内成员
- **限制维度**：使用次数
- **统计周期**：支持日度、周度、月度三种周期（可配置）
- **限制范围**：仅针对进阶类智能体
- **统计粒度**：按小组成员维度统计

#### 周期类型定义

| 周期类型 | 周期标识 | 统计范围 | 重置时间 | 适用场景 |
|---------|---------|---------|---------|---------|
| **日度** | `daily` | 自然日（0:00-23:59） | 每日0点 | 高频使用场景，精细化控制 |
| **周度** | `weekly` | 自然周（周一0:00-周日23:59） | 每周一0点 | 中频使用场景，平衡灵活性 |
| **月度** | `monthly` | 自然月（1日0:00-月末23:59） | 每月1日0点 | 低频使用场景，长周期管理 |

#### 功能点拆解

##### 1. 授权配置管理（后台可配）

**1.1 周期类型配置**
- 支持选择周期类型：日度 / 周度 / 月度
- 默认周期类型：月度（保持向后兼容）
- 周期类型切换时的处理：
  - 立即生效，当前周期数据归档
  - 新周期从切换时刻开始计算

**1.2 使用次数上限配置**
- 支持配置小组成员在对应周期内的使用次数上限
- 支持按成员单独配置或批量配置
- 配置参数：
  - `quota_period`: 周期类型（daily/weekly/monthly）
  - `quota_limit`: 次数上限
  - `effective_time`: 生效时间
- 支持配置的增删改查

**1.3 配置示例**
```json
{
  "member_id": "user_001",
  "agent_type": "advanced",
  "quota_config": {
    "period": "weekly",      // 周期类型：daily/weekly/monthly
    "limit": 10,             // 次数上限
    "effective_from": "2025-01-01T00:00:00Z"
  }
}
```

##### 2. 使用次数统计

**2.1 统计维度**
- 成员ID + 周期类型 + 周期标识
- 周期标识格式：
  - 日度：`2025-01-15`
  - 周度：`2025-W03`（ISO周）
  - 月度：`2025-01`

**2.2 统计时机**
- 每次调用进阶类智能体时累加
- 仅统计调用成功的次数

**2.3 统计数据结构**
```json
{
  "member_id": "user_001",
  "period_type": "weekly",
  "period_id": "2025-W03",
  "used_count": 5,
  "quota_limit": 10,
  "last_updated": "2025-01-15T10:30:00Z"
}
```

##### 3. 使用次数校验
- 在调用进阶类智能体前检查当前周期使用次数
- 根据配置的周期类型确定统计范围
- 判断是否超过授权上限
- 超过上限时拒绝调用并提示，提示信息需体现周期类型：
  - 日度："今日使用次数已达上限（X次/日）"
  - 周度："本周使用次数已达上限（X次/周）"
  - 月度："本月使用次数已达上限（X次/月）"

##### 4. 数据重置

**4.1 自动重置机制**
| 周期类型 | 重置触发时间 | 重置逻辑 |
|---------|-------------|---------|
| 日度 | 每日0点 | 创建新的日度统计记录 |
| 周度 | 每周一0点 | 创建新的周度统计记录 |
| 月度 | 每月1日0点 | 创建新的月度统计记录 |

**4.2 重置实现方式**
- 采用"惰性重置"策略：不主动清零，而是根据当前时间计算周期标识
- 首次访问新周期时自动创建新统计记录
- 历史周期数据保留用于审计和统计分析

#### 业务规则
- 根据配置的周期类型进行统计和重置
- 仅统计成功调用的次数（调用失败不计入）
- 仅针对"进阶类智能体"进行限制（需明确进阶类智能体的定义和分类）
- 周期类型变更时，原周期剩余额度不累积到新周期
- 时区统一采用服务器时区（建议UTC+8）

#### 周期边界处理
- **日度边界**：以服务器时区的0点为分界
- **周度边界**：以ISO标准，周一为每周第一天
- **月度边界**：以自然月1日0点为分界
- **跨周期调用**：调用时刻决定归属周期，调用过程中跨周期的按开始时刻计入


---

### 需求2：每日Token使用量授权限制

#### 功能描述
对小组内成员每日可使用所有智能体的总Token量进行授权限制。

#### 关键要素
- **限制对象**：小组内成员
- **限制维度**：Token使用量
- **统计周期**：每日
- **限制范围**：所有智能体（包括基础类和进阶类）
- **统计粒度**：按成员维度统计所有智能体的Token总和

#### 功能点拆解
1. **授权配置管理**
   - 支持配置小组成员的每日Token使用量上限
   - 支持按成员或批量配置
   - 支持配置的增删改查
   - Token单位：支持配置具体数值（如：10000 tokens）

2. **Token使用量统计**
   - 统计成员在当前日内使用所有智能体消耗的Token总量
   - 统计维度：成员ID + 统计日期
   - 统计时机：每次调用智能体后累加实际消耗的Token数
   - Token统计来源：从智能体调用响应中获取实际消耗的Token数

3. **Token使用量校验**
   - 在调用智能体前预估Token消耗
   - 检查当前日Token使用量 + 预估消耗是否超过授权上限
   - 超过上限时拒绝调用并提示
   - 或支持"先调用后校验"，调用后统计实际消耗

4. **数据重置**
   - 每日0点自动重置Token使用量统计
   - 或支持手动重置

#### 业务规则
- 按日统计，每日0点重置计数
- 统计所有智能体的Token消耗总和（包括基础类和进阶类）
- Token消耗统计实际值（而非预估值）
- 仅统计成功调用的Token消耗（调用失败不计入）

#### 异常情况处理
- 跨日边界处理：统计周期的切换
- 配置变更：中途修改授权上限的处理逻辑
- Token统计异常：实际消耗获取失败的处理
- 预估vs实际：预估Token与实际消耗差异的处理

---

## 关联功能需求

### 权限管理
- 需要支持配置授权的权限管理（谁可以配置授权限制）
- 需要支持查看授权使用情况的权限管理

### 数据展示
- 成员使用情况查询：支持查看当前使用次数/Token使用量
- 使用历史查询：支持查看历史使用记录
- 预警提示：接近上限时的提示机制

### UI界面展示

#### 1. 个人中心

##### 1.1 授权信息模块
- **位置**：在原有授权信息区域
- **新增字段**：进阶智能体使用次数
- **显示格式**：根据配置的周期类型动态显示

| 周期类型 | 显示格式 | 示例 |
|---------|---------|------|
| 日度 | `X次/日（今日可用 Y次）` | `5次/日（今日可用 3次）` |
| 周度 | `X次/周（本周可用 Y次）` | `10次/周（本周可用 6次）` |
| 月度 | `X次/月（本月可用 Y次）` | `30次/月（本月可用 22次）` |

- **周期标识显示**：可选择性展示当前周期范围
  - 日度：显示日期（如：2025-01-15）
  - 周度：显示周范围（如：01.13 - 01.19）
  - 月度：显示月份（如：2025年1月）

##### 1.2 团队成员列表
- **位置**：团队成员列表页面
- **新增字段**：进阶类智能体使用次数、周期类型
- **显示内容**：
  - 周期类型标签：日/周/月
  - 使用情况：`已用次数/总次数`
- **显示格式**：`[周期标签] 已用次数/总次数`
  - 示例：`[周] 4/10` 或 `[月] 8/30`
- **数据更新**：实时或准实时更新成员的使用情况

##### 1.3 周期配置管理界面（管理员）
- **位置**：团队管理 > 授权配置
- **功能**：
  - 周期类型选择：下拉选择 日度/周度/月度
  - 次数上限设置：数字输入框
  - 批量配置：支持选择多个成员统一配置
  - 配置预览：显示配置生效后的预期效果
- **操作确认**：周期类型变更需二次确认，提示"切换周期类型将重新开始计数"

#### 2. 首页授权速览

##### 2.1 入口位置
- **位置**：首页新增授权速览入口
- **交互方式**：鼠标hover触发展示

##### 2.2 Hover展示内容
- **进阶类智能体剩余次数**
  - 根据周期类型动态显示：
    - 日度：`今日剩余 X 次`
    - 周度：`本周剩余 X 次`
    - 月度：`本月剩余 X 次`
  - 附带周期重置提示（可选）：
    - 日度：`明日0点重置`
    - 周度：`周一0点重置`
    - 月度：`下月1日重置`

- **今日Token剩余量**
  - 显示今日剩余可用Token量
  - 格式示例：`剩余 5000 tokens` 或 `剩余 5K tokens`

- **查看使用情况（快捷按钮）**
  - 按钮文案：查看使用情况
  - 功能：点击后跳转至个人中心
  - 交互：支持点击跳转

##### 2.3 交互设计
- Hover触发：鼠标悬停在授权速览入口上时显示
- 展示方式：建议使用Tooltip或Popover组件
- 自动隐藏：鼠标移开后自动隐藏

#### 3. 使用记录与统计

##### 3.1 使用历史查询
- **筛选条件**：
  - 周期类型筛选：日度/周度/月度
  - 时间范围筛选：支持按周期查询历史记录
- **展示内容**：
  - 周期标识、使用次数、配额上限、使用率
- **导出功能**：支持导出历史使用数据

##### 3.2 统计分析（可选）
- 使用趋势图：展示各周期的使用情况趋势
- 使用率分布：展示团队成员的使用率分布

### 与现有功能的关联
- 需要与智能体分类系统关联（识别进阶类智能体）
- 需要与Token统计系统关联（获取实际Token消耗）
- 需要与用户/成员管理系统关联（识别小组成员）

## 边界说明

### 不包含的内容（待明确）
- 是否支持临时增加额度（临时授权）
- 是否支持不同成员的差异化配置
- 是否支持按小组统一配置（所有成员共享额度）
- 超限后的处理策略（仅拒绝 vs 支持管理员审批后继续）
- 是否支持混合周期配置（如同时设置日度和月度限制）

### 待明确事项
1. 进阶类智能体的定义和分类标准
2. Token统计的准确性要求（精确 vs 近似）
3. 授权配置的管理权限归属
4. 统计数据的存储和查询要求
5. 周期类型变更时的数据迁移策略
6. 是否需要支持自定义周期（如：每N天重置）

---

## 附录：周期配置功能技术要点

### 数据库设计建议

#### 配额配置表 `quota_config`
```sql
CREATE TABLE quota_config (
    id BIGINT PRIMARY KEY,
    member_id VARCHAR(64) NOT NULL,
    agent_type VARCHAR(32) NOT NULL,     -- 'advanced' 进阶类
    period_type VARCHAR(16) NOT NULL,    -- 'daily'/'weekly'/'monthly'
    quota_limit INT NOT NULL,
    effective_from TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_member_agent (member_id, agent_type)
);
```

#### 使用统计表 `quota_usage`
```sql
CREATE TABLE quota_usage (
    id BIGINT PRIMARY KEY,
    member_id VARCHAR(64) NOT NULL,
    agent_type VARCHAR(32) NOT NULL,
    period_type VARCHAR(16) NOT NULL,
    period_id VARCHAR(16) NOT NULL,      -- '2025-01-15'/'2025-W03'/'2025-01'
    used_count INT DEFAULT 0,
    quota_limit INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE INDEX idx_usage_key (member_id, agent_type, period_type, period_id)
);
```

### API接口设计建议

#### 1. 获取配额配置
```
GET /api/v1/quota/config/{member_id}
Response:
{
    "member_id": "user_001",
    "agent_type": "advanced",
    "period_type": "weekly",
    "quota_limit": 10,
    "effective_from": "2025-01-01T00:00:00Z"
}
```

#### 2. 更新配额配置
```
PUT /api/v1/quota/config/{member_id}
Request:
{
    "period_type": "daily",
    "quota_limit": 5
}
```

#### 3. 获取使用情况
```
GET /api/v1/quota/usage/{member_id}?period_type=weekly
Response:
{
    "member_id": "user_001",
    "period_type": "weekly",
    "period_id": "2025-W03",
    "used_count": 5,
    "quota_limit": 10,
    "remaining": 5,
    "period_start": "2025-01-13T00:00:00Z",
    "period_end": "2025-01-19T23:59:59Z"
}
```

### 周期计算工具方法

```python
from datetime import datetime, timedelta

def get_period_id(period_type: str, dt: datetime = None) -> str:
    """获取当前周期标识"""
    dt = dt or datetime.now()
    if period_type == 'daily':
        return dt.strftime('%Y-%m-%d')
    elif period_type == 'weekly':
        return dt.strftime('%Y-W%W')
    elif period_type == 'monthly':
        return dt.strftime('%Y-%m')
    raise ValueError(f"Unknown period type: {period_type}")

def get_period_range(period_type: str, period_id: str) -> tuple:
    """获取周期的起止时间"""
    if period_type == 'daily':
        start = datetime.strptime(period_id, '%Y-%m-%d')
        end = start + timedelta(days=1) - timedelta(seconds=1)
    elif period_type == 'weekly':
        year, week = period_id.split('-W')
        start = datetime.strptime(f'{year}-W{week}-1', '%Y-W%W-%w')
        end = start + timedelta(days=7) - timedelta(seconds=1)
    elif period_type == 'monthly':
        start = datetime.strptime(period_id + '-01', '%Y-%m-%d')
        next_month = start.replace(day=28) + timedelta(days=4)
        end = next_month.replace(day=1) - timedelta(seconds=1)
    return (start, end)
```

