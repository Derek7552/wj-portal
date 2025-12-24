# CortexFlow 源代码漏洞挖掘技术实现

> **文档版本**: v1.0
> **创建日期**: 2025-12-17
> **基于版本**: CortexFlow v1.10.0

---

## 目录

1. [技术架构概览](#1-技术架构概览)
2. [核心技术实现思路](#2-核心技术实现思路)
3. [关键阶段与步骤](#3-关键阶段与步骤)
4. [各阶段产物](#4-各阶段产物)
5. [核心技术组件](#5-核心技术组件)
6. [技术特性与优势](#6-技术特性与优势)
7. [技术实现细节](#7-技术实现细节)

---

## 1. 技术架构概览

### 1.1 整体架构

CortexFlow 采用**编译式 + 多智能体协同**的架构，将源代码漏洞挖掘任务分解为可执行的工作流。

```
┌────────────────────────────────────────────────────────────┐
│                   编译链路 (Compilation Pipeline)           │
│  Cortex (.md) → Signal (.json) → Flow (.yaml) → 执行        │
│   策略文档        中间表示          执行图        运行时     │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│              三层智能体架构 (Three-Tier Agents)             │
│  L3 Orchestrators: code-audit-flow                         │
│  L2 Agents: code-audit-agent, recon-agent                  │
│  L1 Skills: code-analysis, vuln-detect, injection-attack   │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│               运行时层 (Runtime Layers)                     │
│  Signal Runtime → Flow Runtime → Agent Runtime → Tool Runtime │
└────────────────────────────────────────────────────────────┘
```

### 1.2 技术栈

| 层级 | 技术组件 | 作用 |
|------|---------|------|
| **策略层** | Markdown + YAML | 策略定义、工作流编排 |
| **编译层** | Python (Signal/Flow Compiler) | Cortex → Signal → Flow 转换 |
| **运行时层** | Python + LLM (MPI) | P→E→R 循环、Agent 执行 |
| **工具层** | Static Analysis Tools | 代码扫描、模式匹配、数据流分析 |

---

## 2. 核心技术实现思路

### 2.1 设计理念

**策略驱动 (Policy-Driven)**
- 安全专家将审计经验编写为 Cortex 策略文档
- 系统负责解析、编译并执行策略
- 策略与执行分离，可复用、可验证

**多智能体协同 (Multi-Agent Collaboration)**
- L1 Skills：原子能力（代码分析、漏洞检测）
- L2 Agents：领域专家（代码审计、漏洞利用）
- L3 Orchestrators：编排智能体（完整审计流程）

**编译式执行 (Compilation-Based Execution)**
- Cortex (.md) → Signal (.json) → Flow (.yaml)
- 编译时检查循环依赖、验证节点引用
- 运行时按 DAG 执行，支持条件分支和并行

**LLM 赋能的智能分析 (LLM-Powered Analysis)**
- 使用 LLM 进行代码理解、上下文分析
- P→E→R 循环（Planner → Executor → Reflector）
- 支持多模型（Claude、GPT、DeepSeek、Qwen 等）

### 2.2 技术路线

```
┌─────────────────────────────────────────────────────────────┐
│ 步骤 1: 策略定义 (Cortex)                                    │
│ - 定义审计阶段（结构分析、漏洞检测、数据流分析、报告生成）    │
│ - 指定 Agent 调度策略                                        │
│ - 定义输入/输出依赖关系                                      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 步骤 2: 编译转换 (Signal Runtime)                            │
│ - Parser: Cortex (.md) → Signal (.json)                     │
│ - Compiler: Signal (.json) → Flow (.yaml)                   │
│ - Validator: Schema 验证、循环依赖检测                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 步骤 3: 工作流执行 (Flow Runtime)                            │
│ - FlowExecutor: 遍历 DAG 节点                                │
│ - ConditionEvaluator: 条件分支评估                           │
│ - 并行执行支持（可选）                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 步骤 4: Agent 执行 (Agent Runtime)                           │
│ - AgentEngine: P→E→R 循环                                    │
│   - Planner: 规划任务                                        │
│   - Executor: 调用 LLM 和工具                                │
│   - Reflector: 反思结果，决定重试或继续                      │
│ - MPI: 多模型接口统一                                        │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 步骤 5: 工具调用 (Tool Runtime)                              │
│ - ToolDispatcher: 分发工具调用                               │
│ - Skills: code-analysis, vuln-detect, injection-attack       │
│ - 使用 Read/Grep/Glob 进行代码扫描                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. 关键阶段与步骤

### 3.1 阶段 1: 代码结构分析 (Structure Analysis)

**目标**：理解代码库结构，为漏洞检测做准备

| 步骤 | 技术实现 | 工具/方法 |
|------|---------|----------|
| **1.1 扫描目录结构** | 使用 Glob 递归查找源代码文件 | `Glob(pattern="**/*.{py,js,php,java,go}")` |
| **1.2 识别语言和框架** | 基于文件扩展名和特征文件（如 `package.json`） | 正则匹配、文件特征识别 |
| **1.3 统计代码规模** | 统计文件数、总行数 | `wc -l` 或 Python 文件读取 |
| **1.4 识别入口点** | 查找 main 函数、路由定义、API 端点 | Grep 搜索 `def main`、`@app.route` 等 |
| **1.5 生成代码结构图** | 构建模块依赖关系图 | 静态分析工具（如 AST 解析） |

**调度 Agent**: `code-audit-agent`

**输入**:
- `source_path`: 源代码路径
- `language`: 编程语言（可选，默认 auto）
- `depth`: 审计深度（quick/standard/thorough）

**输出**:
```yaml
structure_info:
  languages: ["python", "javascript"]
  framework: "flask"
  file_count: 150
  line_count: 12000
  entry_points:
    - "app/main.py"
    - "app/routes.py"
  key_modules:
    - "auth"
    - "api"
    - "database"
```

**决策点**:
- 代码量过大（>100k 行）→ 分模块审计
- 多语言项目 → 按语言分别处理
- 混淆代码 → 尝试反混淆

---

### 3.2 阶段 2: 漏洞检测 (Vulnerability Detection)

**目标**：基于模式匹配和规则检测漏洞

| 步骤 | 技术实现 | 工具/方法 |
|------|---------|----------|
| **2.1 危险函数检测** | 使用 Grep 搜索危险函数调用 | `grep -rn "eval\|exec\|system" --include="*.py"` |
| **2.2 SQL 注入检测** | 搜索 SQL 拼接模式 | 正则匹配 `"SELECT.*\+.*FROM"` |
| **2.3 XSS 检测** | 搜索 innerHTML、document.write | Grep + 上下文分析 |
| **2.4 硬编码凭证检测** | 搜索 API 密钥、密码模式 | 正则匹配 `password\s*=\s*['\"]` |
| **2.5 加密缺陷检测** | 检测弱加密算法（MD5、SHA1） | Grep + 算法库识别 |
| **2.6 路径遍历检测** | 检测用户输入拼接文件路径 | 数据流分析（Source → Sink） |
| **2.7 反序列化检测** | 检测 `pickle.loads`、`unserialize` | Grep + 上下文分析 |
| **2.8 命令注入检测** | 检测 `os.system`、`subprocess.call` | 数据流分析 |

**调度 Agent**: `code-audit-agent`

**使用的 Skills**:
- `code-analysis`: 通用代码分析
- `injection-attack`: SQL/命令/NoSQL 注入检测
- `cryptographic-failures`: 加密缺陷检测
- `insecure-design`: 业务逻辑漏洞检测
- `vulnerable-components`: 依赖漏洞检测
- `logging-monitoring-failures`: 日志审计
- `integrity-failures`: 反序列化漏洞检测

**输入**:
- `source_path`: 源代码路径
- `structure_info`: 阶段 1 的结构信息

**输出**:
```yaml
vulnerabilities:
  - id: "VULN-001"
    type: "sqli"
    file_path: "app/models/user.py"
    line_number: 42
    code_snippet: 'query = "SELECT * FROM users WHERE id = " + user_id'
    severity: "high"
    description: "用户输入直接拼接到 SQL 查询中，存在 SQL 注入风险"
  - id: "VULN-002"
    type: "hardcoded-secret"
    file_path: "config/settings.py"
    line_number: 15
    code_snippet: 'DB_PASSWORD = "admin123"'
    severity: "critical"
    description: "数据库密码硬编码在配置文件中"

statistics:
  total: 15
  by_type:
    sqli: 5
    hardcoded-secret: 3
    xss: 4
    command-injection: 2
    deserialization: 1
  by_severity:
    critical: 3
    high: 7
    medium: 4
    low: 1
```

**决策点**:
- 发现高危漏洞 → 进入数据流分析
- 发现大量同类问题 → 归类统计
- 不确定的发现 → 标记"需人工确认"
- 未发现漏洞 → 跳过阶段 3，直接生成报告

---

### 3.3 阶段 3: 数据流分析 (Data Flow Analysis)

**目标**：追踪污点传播路径，确认漏洞可利用性

| 步骤 | 技术实现 | 工具/方法 |
|------|---------|----------|
| **3.1 识别数据源 (Source)** | 查找用户输入点（`request.args`、`$_GET`） | 模式匹配 + AST 分析 |
| **3.2 正向追踪传播** | 从 Source 追踪变量传播 | 数据流分析（Use-Def Chain） |
| **3.3 反向追踪来源** | 从 Sink 反向追踪数据来源 | 反向数据流分析 |
| **3.4 路径匹配** | 找出 Source 到 Sink 的完整路径 | 路径搜索算法 |
| **3.5 过滤检查** | 检查路径上的过滤/转义函数 | 模式匹配（`escape()`、`htmlspecialchars()`） |
| **3.6 绕过分析** | 评估过滤是否可被绕过 | LLM 辅助分析 + 已知绕过技巧 |
| **3.7 可利用性判定** | 确定漏洞是否可实际利用 | 综合分析 + 置信度评分 |

**调度 Agent**: `code-audit-agent`

**技术细节**:

**污点追踪 (Taint Tracking)**:
```
Source (用户输入) → 变量传播 → Sink (危险函数)
```

**示例路径**:
```python
# Step 1: Source
user_id = request.args.get('id')  # 污点源

# Step 2: 传播
query = f"SELECT * FROM users WHERE id = {user_id}"  # 污点传播

# Step 3: Sink
cursor.execute(query)  # 危险函数
```

**输入**:
- `source_path`: 源代码路径
- `vulnerabilities`: 阶段 2 发现的漏洞列表
- `structure_info`: 阶段 1 的结构信息

**输出**:
```yaml
dataflow_results:
  - vuln_id: "VULN-001"
    taint_path:
      - step: 1
        location: "app/views.py:42"
        code: "user_id = request.args.get('id')"
        type: "source"
        variable: "user_id"
      - step: 2
        location: "app/views.py:45"
        code: "query = f'SELECT * FROM users WHERE id = {user_id}'"
        type: "propagation"
        variable: "query"
      - step: 3
        location: "app/views.py:46"
        code: "cursor.execute(query)"
        type: "sink"
        function: "execute"
    source:
      type: "http_parameter"
      name: "id"
    sink:
      type: "sql_query"
      function: "execute"
    filters: []  # 无过滤
    bypass_possible: true
    exploitable: true
    confidence: "high"

confirmed_vulns: 12  # 确认可利用的漏洞
false_positives: 3   # 被正确过滤的误报
```

**决策点**:
- 数据流可达危险函数 → 确认为漏洞
- 存在过滤但可绕过 → 记录绕过方法
- 数据流被正确过滤 → 标记为安全

---

### 3.4 阶段 4: 报告生成 (Reporting)

**目标**：汇总发现，生成结构化审计报告

| 步骤 | 技术实现 | 工具/方法 |
|------|---------|----------|
| **4.1 汇总所有阶段发现** | 聚合 Phase 1-3 的输出 | 数据结构合并 |
| **4.2 按严重程度分类** | 按 critical/high/medium/low 排序 | 风险评分算法 |
| **4.3 提供修复建议** | 基于漏洞类型匹配修复模板 | 规则引擎 + LLM 生成 |
| **4.4 标注漏洞位置** | 文件路径 + 行号 + 代码片段 | 格式化输出 |
| **4.5 生成 Markdown 报告** | 使用模板引擎生成报告 | Jinja2 或 Python f-string |

**调度 Agent**: `report-agent`

**输入**:
- `source_path`: 源代码路径
- `structure_info`: 阶段 1 输出
- `vulnerabilities`: 阶段 2 输出
- `dataflow_results`: 阶段 3 输出
- `confirmed_vulns`: 阶段 3 确认的漏洞
- `false_positives`: 阶段 3 的误报列表

**输出**:
```yaml
report_path: "workspaces/tasks/{task-id}/report/report.md"
summary:
  critical: 3
  high: 7
  medium: 4
  low: 1
  total: 15
  by_type:
    sqli: 5
    hardcoded-secret: 3
    xss: 4
    command-injection: 2
    deserialization: 1
executive_summary: |
  本次代码审计共发现 15 个安全问题，其中严重漏洞 3 个、高危漏洞 7 个...
```

**报告格式** (Markdown):
```markdown
# 代码审计报告

## 审计范围
- 目标目录: /path/to/source
- 文件数量: 150
- 代码行数: 12000

## 发现摘要
- 严重: 3
- 高危: 7
- 中危: 4
- 低危: 1

## 详细发现

### VULN-001: SQL 注入风险

**文件**: `app/models/user.py:42`

**代码**:
```python
query = "SELECT * FROM users WHERE id = " + user_id
```

**风险**: 高

**描述**: 用户输入直接拼接到 SQL 查询中，存在 SQL 注入风险。

**数据流路径**:
1. Source: `user_id = request.args.get('id')` (app/views.py:42)
2. Propagation: `query = f"SELECT * FROM users WHERE id = {user_id}"` (app/views.py:45)
3. Sink: `cursor.execute(query)` (app/views.py:46)

**修复建议**:
```python
stmt = conn.prepare("SELECT * FROM users WHERE id = ?")
stmt.execute([user_id])
```

---
```

---

## 4. 各阶段产物

### 4.1 目录结构

```
workspaces/tasks/{task-id}/
├── structure-analysis/
│   └── output.yaml              # 阶段 1 产物
├── vuln-detection/
│   └── output.yaml              # 阶段 2 产物
├── dataflow-analysis/
│   └── output.yaml              # 阶段 3 产物
└── report/
    ├── output.yaml              # 阶段 4 元数据
    └── report.md                # 阶段 4 最终报告
```

### 4.2 产物说明

| 阶段 | 产物文件 | 内容 | 格式 |
|------|---------|------|------|
| **Phase 1** | `structure-analysis/output.yaml` | 代码结构信息、语言、框架、入口点、关键模块 | YAML |
| **Phase 2** | `vuln-detection/output.yaml` | 漏洞列表、统计信息（按类型、严重程度） | YAML |
| **Phase 3** | `dataflow-analysis/output.yaml` | 数据流分析结果、污点路径、确认漏洞、误报列表 | YAML |
| **Phase 4** | `report/output.yaml` | 报告元数据、统计摘要、执行摘要 | YAML |
| **Phase 4** | `report/report.md` | 完整的代码审计报告 | Markdown |

---

## 5. 核心技术组件

### 5.1 编译链路 (Compilation Pipeline)

#### 5.1.1 Cortex Parser

**功能**: 解析 Cortex (.md) → Signal (.json)

**技术实现**:
```python
# cortex/runtime/signal/parsers/cortex_parser.py
class CortexParser:
    def parse(self, cortex_path: str) -> dict:
        """
        解析 Cortex 文档
        1. 提取 YAML frontmatter（元数据）
        2. 解析 Markdown 内容（阶段定义）
        3. 转换为 Signal JSON
        """
        # 读取 Cortex 文件
        with open(cortex_path) as f:
            content = f.read()

        # 提取 frontmatter
        metadata = self._extract_frontmatter(content)

        # 解析阶段定义
        phases = self._parse_phases(content)

        return {
            "id": f"{metadata['orchestrator']}-signal",
            "version": metadata["version"],
            "phases": phases,
            "global_inputs": metadata.get("global_inputs", {})
        }
```

#### 5.1.2 Flow Compiler

**功能**: 编译 Signal (.json) → Flow (.yaml)

**技术实现**:
```python
# cortex/runtime/signal/compiler.py
class FlowCompiler:
    def compile(self, signal: dict) -> dict:
        """
        编译 Signal 为 Flow DAG
        1. 将 phases 转换为 Flow 节点
        2. 检测循环依赖
        3. 确定入口节点
        4. 构建执行流程图
        """
        phases = signal["phases"]

        # 构建节点
        nodes = self._build_nodes(phases)

        # 循环依赖检测
        if self._has_cycle(nodes):
            raise ParseError("检测到循环依赖")

        # 确定入口
        entry = self._find_entry_node(phases)

        return {
            "id": signal["id"].replace("-signal", ""),  # web-pentest-flow
            "version": signal["version"],
            "entry": entry,
            "nodes": nodes
        }
```

### 5.2 执行引擎 (Execution Engine)

#### 5.2.1 FlowExecutor

**功能**: 执行 Flow DAG

**技术实现**:
```python
# cortex/runtime/flow/executor/flow_executor.py
class FlowExecutor:
    def execute(self, flow: dict, context: ExecutionContext) -> dict:
        """
        执行 Flow DAG
        1. 从 entry 节点开始
        2. 遍历节点，调用对应 Executor
        3. 处理条件分支
        4. 处理失败转换
        """
        current_node = flow["entry"]

        while current_node != "end":
            node = self._get_node(flow, current_node)

            # 根据节点类型分发
            if node["type"] == "agent":
                result = self.agent_engine.execute_node(node, context)
            elif node["type"] == "skill":
                result = self.skill_executor.execute(node, context)

            # 条件分支评估
            next_node = self._evaluate_transitions(node, result, context)
            current_node = next_node

        return {"status": "completed", "output": context.outputs}
```

#### 5.2.2 AgentEngine (P→E→R 循环)

**功能**: 执行单个 Agent 节点

**技术实现**:
```python
# cortex/runtime/agent/agent_engine.py
class AgentEngine:
    def execute_node(self, node: FlowNode, context: ExecutionContext) -> ExecutionResult:
        """
        P→E→R 循环执行
        """
        for round_num in range(1, self.config.max_rounds + 1):
            # Planner: 规划任务
            plan = self.planner.plan(node, context)

            # Executor: 执行计划（调用 LLM + 工具）
            result = self.executor.execute(plan, context)

            # Reflector: 反思结果
            reflection = self.reflector.reflect(result, node, context)

            # 判断是否停止
            if reflection.decision == "PROCEED_TO_NEXT":
                break
            elif reflection.decision == "RETRY_WITH_REMINDER":
                context.reminders.append(reflection.reminder)
                continue
            elif reflection.decision == "STOP_REQUIRE_MANUAL":
                break

        return result
```

### 5.3 工具调用 (Tool Invocation)

#### 5.3.1 ToolDispatcher

**功能**: 分发工具调用到具体的 Skill

**技术实现**:
```python
# cortex/runtime/tool/tool_engine.py
class ToolDispatcher:
    def dispatch(self, tool_name: str, params: dict) -> dict:
        """
        调用工具
        """
        if tool_name == "Read":
            return self._read_file(params["file_path"])
        elif tool_name == "Grep":
            return self._grep(params["pattern"], params["path"])
        elif tool_name == "Glob":
            return self._glob(params["pattern"], params["path"])
        # ... 其他工具
```

#### 5.3.2 Skills 实现

**code-analysis Skill**:
```python
# 危险函数检测
def detect_dangerous_functions(code_path: str, language: str) -> list:
    """
    检测危险函数调用
    """
    dangerous_patterns = {
        "python": ["eval", "exec", "os.system", "subprocess"],
        "javascript": ["eval", "innerHTML", "document.write"],
        "php": ["eval", "exec", "system", "passthru"],
    }

    pattern = "|".join(dangerous_patterns[language])
    results = grep(pattern, code_path)

    return [
        {
            "file": match.file,
            "line": match.line_number,
            "code": match.line,
            "type": "dangerous_function"
        }
        for match in results
    ]
```

**injection-attack Skill**:
```python
# SQL 注入检测
def detect_sql_injection(code_path: str) -> list:
    """
    检测 SQL 注入模式
    """
    # 字符串拼接的 SQL
    pattern = r'(SELECT|INSERT|UPDATE|DELETE).*\+.*FROM'

    results = grep(pattern, code_path, regex=True)

    return [
        {
            "file": match.file,
            "line": match.line_number,
            "code": match.line,
            "type": "sqli",
            "severity": "high"
        }
        for match in results
    ]
```

### 5.4 多模型接口 (MPI)

**功能**: 统一多种 LLM 的调用接口

**技术实现**:
```python
# cortex/runtime/agent/mpi/mpi.py
class MPI:
    def __init__(self, adapter: BaseAdapter):
        self.adapter = adapter

    def call(self, messages: list, tools: list = None) -> dict:
        """
        调用 LLM
        """
        return self.adapter.call(messages, tools)

# cortex/runtime/agent/mpi/adapters/claude.py
class ClaudeAdapter(BaseAdapter):
    def call(self, messages: list, tools: list = None) -> dict:
        response = self.client.messages.create(
            model="claude-3-5-sonnet-20241022",
            messages=messages,
            tools=tools
        )
        return self._parse_response(response)

# cortex/runtime/agent/mpi/adapters/deepseek.py
class DeepSeekAdapter(BaseAdapter):
    def call(self, messages: list, tools: list = None) -> dict:
        response = self.client.chat.completions.create(
            model="deepseek-chat",
            messages=messages,
            tools=tools
        )
        return self._parse_response(response)
```

---

## 6. 技术特性与优势

### 6.1 核心优势

| 特性 | 技术实现 | 优势 |
|------|---------|------|
| **策略可复用** | Cortex 策略文档 | 审计经验沉淀为可执行策略，可跨项目复用 |
| **多智能体协同** | 三层智能体架构 | 任务分解清晰，职责边界明确 |
| **编译时检查** | Signal/Flow 编译器 | 编译时发现错误（循环依赖、无效引用） |
| **多模型支持** | MPI 抽象层 | 支持 Claude、GPT、DeepSeek 等多种 LLM |
| **污点追踪** | 数据流分析 | 确认漏洞可利用性，减少误报 |
| **自动化程度高** | 端到端自动化 | 从代码扫描到报告生成全流程自动化 |

### 6.2 技术创新点

**1. 编译式工作流**
- 将策略文档编译为可执行的 DAG，而非传统的脚本式执行
- 支持复杂的条件分支和并行执行

**2. P→E→R 循环**
- Planner（规划）→ Executor（执行）→ Reflector（反思）
- 自我修正能力，遇到错误可重试

**3. LLM 赋能的代码理解**
- 使用 LLM 进行上下文分析、变量追踪
- 超越传统静态分析工具的语义理解能力

**4. 多层 Skills 体系**
- OWASP Top 10 对应的专用 Skills（injection-attack、cryptographic-failures 等）
- 可插拔、可组合的能力模块

**5. 数据流分析**
- Source → Propagation → Sink 完整路径追踪
- 过滤绕过分析、可利用性判定

### 6.3 支持的漏洞类型

| OWASP 排名 | 漏洞类型 | 对应 Skill | 检测技术 |
|-----------|---------|-----------|---------|
| A01 | 访问控制失效 | `broken-access-control` | 权限检查模式匹配 |
| A02 | 加密失败 | `cryptographic-failures` | 硬编码凭证、弱加密算法检测 |
| A03 | 注入攻击 | `injection-attack` | SQL/命令/NoSQL 注入模式匹配 + 数据流分析 |
| A04 | 不安全设计 | `insecure-design` | 业务逻辑漏洞、竞态条件检测 |
| A05 | 安全配置错误 | `security-misconfiguration` | 配置文件审计、Debug 模式检测 |
| A06 | 易受攻击组件 | `vulnerable-components` | 依赖版本检查、CVE 匹配 |
| A07 | 认证失败 | `auth-failures` | 弱密码策略、会话管理检测 |
| A08 | 软件和数据完整性失败 | `integrity-failures` | 反序列化漏洞检测 |
| A09 | 安全日志和监控失败 | `logging-monitoring-failures` | 日志审计 |
| A10 | 服务端请求伪造 | `ssrf-attack` | SSRF 模式检测 |
| - | XSS | `xss-attack` | innerHTML、document.write 检测 |
| - | XXE | `xxe-attack` | XML 解析器配置检测 |
| - | CSRF | `csrf-attack` | CSRF Token 检查 |
| - | 文件上传漏洞 | `file-upload-vuln` | 文件类型验证检测 |
| - | SSTI | `ssti-attack` | 模板注入检测 |

---

## 7. 技术实现细节

### 7.1 代码扫描技术

**Grep 正则匹配**:
```python
# 危险函数检测
grep -rn "eval\|exec\|system" --include="*.py" ./

# SQL 拼接检测
grep -rn "SELECT.*\+.*FROM" --include="*.{py,php,java}" ./

# 硬编码密码检测
grep -rn "password\s*=\s*['\"]" --include="*.{py,js,php}" ./

# AWS 凭证检测
grep -rn "AKIA[0-9A-Z]{16}" ./
```

**Glob 文件定位**:
```python
# 查找所有 Python 文件
glob("**/*.py")

# 查找配置文件
glob("**/*.{conf,yaml,json,ini}")

# 查找特定文件
glob("**/settings.py")
```

### 7.2 数据流分析算法

**污点追踪伪代码**:
```python
def taint_tracking(source, code_ast):
    """
    污点追踪算法
    """
    tainted_vars = {source.variable}  # 初始污点变量
    taint_path = []

    for node in code_ast:
        # 检查是否为赋值语句
        if isinstance(node, Assignment):
            # 如果右值包含污点变量
            if any(var in tainted_vars for var in node.rvalue.vars):
                # 左值也被污染
                tainted_vars.add(node.lvalue)
                taint_path.append({
                    "step": len(taint_path) + 1,
                    "location": node.location,
                    "type": "propagation",
                    "variable": node.lvalue
                })

        # 检查是否为危险函数调用
        if isinstance(node, FunctionCall) and node.func in DANGEROUS_FUNCTIONS:
            # 如果参数包含污点变量
            if any(var in tainted_vars for var in node.args):
                taint_path.append({
                    "step": len(taint_path) + 1,
                    "location": node.location,
                    "type": "sink",
                    "function": node.func
                })
                return {
                    "exploitable": True,
                    "taint_path": taint_path
                }

    return {"exploitable": False}
```

### 7.3 LLM Prompt 设计

**代码审计 Prompt 模板**:
```
你是一名专业的代码安全审计专家。请审计以下代码片段，识别潜在的安全漏洞。

代码语言: {language}
文件路径: {file_path}

代码片段:
```{language}
{code_snippet}
```

请分析以下方面：
1. 是否存在 SQL 注入风险？
2. 是否存在 XSS 风险？
3. 是否存在命令注入风险？
4. 是否存在硬编码凭证？
5. 是否存在不安全的加密实现？

对于每个发现的问题，请提供：
- 问题类型
- 严重程度（critical/high/medium/low）
- 详细描述
- 修复建议
```

**数据流分析 Prompt**:
```
请分析以下代码的数据流，追踪用户输入到危险函数的传播路径。

代码:
```{language}
{code}
```

已识别的潜在漏洞:
- 用户输入: {source}
- 危险函数: {sink}

请回答：
1. 用户输入是否能够传播到危险函数？
2. 完整的数据流路径是什么？（变量名、行号）
3. 路径上是否存在过滤/转义函数？
4. 如果存在过滤，是否可以绕过？
5. 该漏洞是否可实际利用？
```

### 7.4 并行执行优化

**支持节点并行**:
```yaml
# Flow YAML
nodes:
  - id: start
    on_success:
      - goto: ["scan_sqli", "scan_xss", "scan_ssrf"]  # 并行 3 个扫描
```

**并行执行配置**:
```python
config = Config(
    agent=Config.Agent(
        enable_parallel=True,  # 启用并行执行
        max_parallel=3,        # 最多 3 个节点并行
        max_iterations=100,    # Flow 执行最大迭代次数
    )
)
```

---

## 总结

CortexFlow 的源代码漏洞挖掘技术实现具有以下特点：

1. **策略驱动**: 将审计经验沉淀为 Cortex 策略，可复用、可验证
2. **多智能体协同**: 三层智能体架构，任务分解清晰
3. **编译式执行**: 编译时检查，运行时高效
4. **LLM 赋能**: 超越传统静态分析的语义理解能力
5. **污点追踪**: 确认漏洞可利用性，减少误报
6. **自动化程度高**: 从代码扫描到报告生成全流程自动化
7. **多模型支持**: 支持 Claude、GPT、DeepSeek 等多种 LLM
8. **OWASP 覆盖**: 支持 OWASP Top 10 + 常见 Web 漏洞类型

该技术架构为 AI 驱动的自动化代码审计提供了一个完整的解决方案。
