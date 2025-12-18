# Git 推送到远程仓库

## 功能说明
将当前分支的提交推送到远程仓库（origin）。这是一个快速推送命令，会自动检查状态并执行推送。

## 使用方式
在 Cursor 中使用此命令时，AI 助手会：
1. 检查当前 git 状态
2. 确认是否有需要推送的提交
3. 执行 `git push` 推送到远程
4. 显示推送结果

## 执行流程

```bash
# 1. 检查当前状态
cd /home/clouditera/clouditera/aipm/wj_portal && git status

# 2. 推送到远程（当前分支）
git push

# 3. 如果是首次推送新分支，使用：
git push -u origin $(git branch --show-current)
```

## 使用场景
- ✅ 本地提交完成后，需要同步到远程仓库
- ✅ 多人协作时，需要将本地更改推送到共享仓库
- ✅ 部署前需要将代码推送到远程
- ✅ 完成功能开发后推送代码

## 注意事项

- ⚠️ **推送前确认**：确保本地代码已测试通过，避免推送有问题的代码
- ⚠️ **分支保护**：如果远程分支有保护规则，确保有推送权限
- ⚠️ **冲突处理**：如果远程有新的提交，可能需要先执行 `git pull` 合并远程更改
- ✅ **推送前检查**：命令会自动检查当前状态
- ✅ **首次推送**：新分支首次推送会自动使用 `-u` 参数设置上游分支

## 相关命令

- `git status` - 查看当前仓库状态
- `git log` - 查看提交历史
- `git pull` - 拉取远程更改
- `git push --force` - 强制推送（谨慎使用，不推荐）

## 快速执行

当你在 Cursor 中说"推送到远程"或"git push"时，AI 助手会：
1. 自动检查 git 状态
2. 如果有未推送的提交，执行推送
3. 显示推送结果和状态

## 示例输出

```
On branch main
Your branch is ahead of 'origin/main' by 2 commits.
  (use "git push" to publish your local commits)

Pushing to origin/main...
To https://github.com/username/repo.git
   abc1234..def5678  main -> main
✅ 推送成功！
```
