# BugKiller Skills CWE 覆盖表

本文档详细列出每个 BugKiller Skill 覆盖的 CWE（Common Weakness Enumeration）编号，用于安全审计和漏洞检测参考。

---

## 📊 统计概览

| 统计项 | 数值 |
|-------|------|
| Skills 总数 | 34 |
| 覆盖 CWE 总数 | 43 |
| 来自测试数据集映射 | 17 |
| 来自标准 CWE 映射 | 26 |

---

## 📋 Skill 与 CWE 对照表

### 1. authentication_jwt

**描述**：JWT（JSON Web Token）认证相关漏洞检测，识别 JWT 实现中的安全缺陷，包括签名验证绕过、算法混淆、密钥泄露等问题。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-287 | Improper Authentication（不当身份验证） | 标准映射 |
| CWE-347 | Improper Verification of Cryptographic Signature（加密签名验证不当） | 标准映射 |
| CWE-501 | Trust Boundary Violation（信任边界违反） | run_cwe_list.json |

---

### 2. broken_function_level_authorization

**描述**：功能级访问控制缺陷检测，识别缺乏权限验证或权限验证不严格的 API 端点和功能。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-284 | Improper Access Control（不当的访问控制） | run_cwe_list.json |
| CWE-285 | Improper Authorization（不当授权） | 标准映射 |

---

### 3. brute

**描述**：暴力破解风险检测，识别缺乏速率限制、账户锁定机制或验证码保护的认证接口。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-307 | Improper Restriction of Excessive Authentication Attempts（过度认证尝试限制不当） | 标准映射 |
| CWE-400 | Uncontrolled Resource Consumption（未受控的资源消耗） | run_cwe_list.json |

---

### 4. business_logic

**描述**：业务逻辑漏洞检测，识别业务流程中的逻辑缺陷，包括流程绕过、状态机异常、业务规则违反等。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-840 | Business Logic Errors（业务逻辑错误） | 标准映射 |
| CWE-841 | Improper Enforcement of Behavioral Workflow（行为工作流执行不当） | 标准映射 |

---

### 5. code_injection

**描述**：代码注入漏洞检测，识别用户输入被作为代码执行的风险点，包括 eval()、exec() 等动态代码执行。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-94 | Improper Control of Generation of Code（代码生成控制不当） | 标准映射 |
| CWE-95 | Improper Neutralization of Directives in Dynamically Evaluated Code（动态执行代码中指令中和不当） | 标准映射 |
| CWE-96 | Improper Neutralization of Directives in Statically Saved Code（静态保存代码中指令中和不当） | 标准映射 |

---

### 6. command_injection

**描述**：操作系统命令注入漏洞检测，识别用户输入未经过滤直接拼接到系统命令中执行的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-78 | Improper Neutralization of Special Elements used in an OS Command（OS 命令中特殊元素中和不当） | run_cwe_list.json |
| CWE-77 | Improper Neutralization of Special Elements used in a Command（命令中特殊元素中和不当） | 标准映射 |

---

### 7. cryptography

**描述**：密码学基础漏洞检测，识别不安全的加密实现，包括明文传输、弱算法、不安全的密钥管理等。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-319 | Cleartext Transmission of Sensitive Information（敏感信息明文传输） | run_cwe_list.json |
| CWE-327 | Use of a Broken or Risky Cryptographic Algorithm（使用已破解或存在风险的加密算法） | run_cwe_list.json |
| CWE-328 | Use of Weak Hash（使用弱哈希） | run_cwe_list.json |
| CWE-760 | Use of a One-Way Hash with a Predictable Salt（使用可预测盐值的单向哈希） | run_cwe_list.json |

---

### 8. csp

**描述**：内容安全策略（CSP）配置漏洞检测，识别 CSP 头缺失、配置过于宽松或存在绕过风险的情况。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-1021 | Improper Restriction of Rendered UI Layers or Frames（渲染的 UI 层或框架限制不当） | 标准映射 |

---

### 9. csrf

**描述**：跨站请求伪造（CSRF）漏洞检测，识别缺乏 CSRF Token 验证或验证不严格的状态变更操作。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-352 | Cross-Site Request Forgery (CSRF)（跨站请求伪造） | 标准映射 |

---

### 10. expression_injection

**描述**：表达式注入漏洞检测，识别用户输入被嵌入表达式语言（如 SpEL、OGNL、EL）执行的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-917 | Improper Neutralization of Special Elements used in an Expression Language Statement（表达式语言语句中特殊元素中和不当） | 标准映射 |

---

### 11. http_header_injection

**描述**：HTTP 头注入漏洞检测，识别用户输入被注入到 HTTP 响应头中导致的安全问题。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-113 | Improper Neutralization of CRLF Sequences in HTTP Headers（HTTP 头中 CRLF 序列中和不当） | run_cwe_list.json |

---

### 12. idor

**描述**：不安全的直接对象引用（IDOR）漏洞检测，识别通过修改对象标识符访问未授权资源的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-639 | Authorization Bypass Through User-Controlled Key（通过用户可控密钥绕过授权） | 标准映射 |

---

### 13. insecure_deserialization

**描述**：不安全反序列化漏洞检测，识别反序列化不可信数据导致远程代码执行或其他安全问题的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-502 | Deserialization of Untrusted Data（不可信数据反序列化） | 标准映射 |

---

### 14. insecure_file_uploads

**描述**：不安全文件上传漏洞检测，识别文件类型验证不足、存储路径可控、文件内容未检查等风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-434 | Unrestricted Upload of File with Dangerous Type（危险类型文件无限制上传） | 标准映射 |

---

### 15. integer_overflow

**描述**：整数溢出漏洞检测，识别整数运算溢出或回绕导致的安全问题。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-190 | Integer Overflow or Wraparound（整数溢出或回绕） | run_cwe_list.json |
| CWE-191 | Integer Underflow（整数下溢） | 标准映射 |

---

### 16. ldap_injection

**描述**：LDAP 注入漏洞检测，识别用户输入未经过滤直接拼接到 LDAP 查询中的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-90 | Improper Neutralization of Special Elements used in an LDAP Query（LDAP 查询中特殊元素中和不当） | run_cwe_list.json |

---

### 17. llm_security

**描述**：大语言模型（LLM）安全漏洞检测，识别 Prompt 注入、数据泄露、模型滥用等 AI 安全风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-74 | Improper Neutralization of Special Elements in Output（输出中特殊元素中和不当） | 标准映射 |
| CWE-94 | Improper Control of Generation of Code（代码生成控制不当） | 标准映射 |
| CWE-200 | Exposure of Sensitive Information（敏感信息泄露） | 标准映射 |

---

### 18. mass_assignment

**描述**：批量赋值漏洞检测，识别允许用户控制对象属性批量赋值导致的权限提升或数据篡改风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-915 | Improperly Controlled Modification of Dynamically-Determined Object Attributes（动态确定对象属性修改控制不当） | 标准映射 |

---

### 19. nosql_injection

**描述**：NoSQL 注入漏洞检测，识别用户输入被嵌入 NoSQL 查询（如 MongoDB）导致的安全问题。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-943 | Improper Neutralization of Special Elements in Data Query Logic（数据查询逻辑中特殊元素中和不当） | 标准映射 |

---

### 20. numeric_conversion_error

**描述**：数值类型转换缺陷检测，识别数值类型转换过程中的精度丢失或溢出问题。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-681 | Incorrect Conversion between Numeric Types（数值类型间转换错误） | run_cwe_list.json |

---

### 21. open_redirect

**描述**：开放重定向漏洞检测，识别允许用户控制重定向目标 URL 导致的钓鱼攻击风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-601 | URL Redirection to Untrusted Site（URL 重定向到不可信站点） | run_cwe_list.json |

---

### 22. path_traversal_lfi_rfi

**描述**：路径遍历和文件包含漏洞检测，识别用户输入被用于文件路径构造导致任意文件读取或远程文件包含的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-22 | Improper Limitation of a Pathname to a Restricted Directory（路径名限制不当） | run_cwe_list.json |
| CWE-98 | Improper Control of Filename for Include/Require Statement（Include/Require 语句文件名控制不当） | 标准映射 |

---

### 23. payment

**描述**：支付安全漏洞检测，识别支付流程中的状态机绕过、金额篡改、回调伪造、幂等性缺失等风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-691 | Insufficient Control Flow Management（控制流管理不足） | 标准映射 |
| CWE-840 | Business Logic Errors（业务逻辑错误） | 标准映射 |

---

### 24. race_conditions

**描述**：竞态条件漏洞检测，识别并发访问共享资源导致的数据不一致或安全绕过风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-362 | Concurrent Execution using Shared Resource with Improper Synchronization（使用共享资源并发执行但同步不当） | 标准映射 |
| CWE-367 | Time-of-check Time-of-use (TOCTOU) Race Condition（检查时间与使用时间竞争条件） | 标准映射 |

---

### 25. security_configuration

**描述**：安全配置漏洞检测，识别默认配置、敏感信息硬编码、安全机制未启用等配置类问题。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-16 | Configuration（配置问题） | 标准映射 |
| CWE-209 | Generation of Error Message Containing Sensitive Information（错误消息包含敏感信息） | 标准映射 |
| CWE-798 | Use of Hard-coded Credentials（使用硬编码凭证） | 标准映射 |

---

### 26. session_and_auth

**描述**：会话管理和身份认证漏洞检测，识别会话固定、会话劫持、认证绕过、密码重置缺陷等问题。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-384 | Session Fixation（会话固定） | 标准映射 |
| CWE-613 | Insufficient Session Expiration（会话过期不足） | run_cwe_list.json |
| CWE-614 | Sensitive Cookie in HTTPS Session Without 'Secure' Attribute（HTTPS 会话中敏感 Cookie 缺少 Secure 属性） | run_cwe_list.json |

---

### 27. sql_injection

**描述**：SQL 注入漏洞检测，识别用户输入未经参数化直接拼接到 SQL 查询中的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-89 | Improper Neutralization of Special Elements used in an SQL Command（SQL 命令中特殊元素中和不当） | run_cwe_list.json |

---

### 28. ssrf

**描述**：服务器端请求伪造（SSRF）漏洞检测，识别用户可控 URL 被服务端请求导致内网探测或云元数据泄露的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-918 | Server-Side Request Forgery (SSRF)（服务器端请求伪造） | 标准映射 |

---

### 29. ssti

**描述**：服务器端模板注入（SSTI）漏洞检测，识别用户输入被嵌入模板引擎执行导致远程代码执行的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-94 | Improper Control of Generation of Code（代码生成控制不当） | 标准映射 |
| CWE-1336 | Improper Neutralization of Special Elements Used in a Template Engine（模板引擎中特殊元素中和不当） | 标准映射 |

---

### 30. uncontrolled_recursion

**描述**：未受控递归漏洞检测，识别递归调用缺乏深度限制导致的栈溢出或拒绝服务风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-674 | Uncontrolled Recursion（未受控递归） | run_cwe_list.json |

---

### 31. weak_cryptography

**描述**：弱加密漏洞检测，识别使用已废弃加密算法（MD5、DES、RC4）、硬编码密钥、不安全随机数等问题。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-259 | Use of Hard-coded Password（使用硬编码密码） | run_cwe_list.json |
| CWE-327 | Use of a Broken or Risky Cryptographic Algorithm（使用已破解或存在风险的加密算法） | run_cwe_list.json |
| CWE-330 | Use of Insufficiently Random Values（使用不足够随机的值） | 标准映射 |

---

### 32. xpath_injection

**描述**：XPath 注入漏洞检测，识别用户输入未经过滤直接拼接到 XPath 查询中的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-643 | Improper Neutralization of Data within XPath Expressions（XPath 表达式中数据中和不当） | run_cwe_list.json |

---

### 33. xss

**描述**：跨站脚本攻击（XSS）漏洞检测，识别用户输入未经编码输出到 HTML 导致恶意脚本执行的风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-79 | Improper Neutralization of Input During Web Page Generation（网页生成期间输入中和不当） | run_cwe_list.json |

---

### 34. xxe

**描述**：XML 外部实体注入（XXE）漏洞检测，识别 XML 解析器未禁用外部实体导致的文件读取或 SSRF 风险。

| CWE 编号 | CWE 名称 | 数据来源 |
|---------|---------|---------|
| CWE-611 | Improper Restriction of XML External Entity Reference（XML 外部实体引用限制不当） | 标准映射 |

---

## 📊 CWE Top 25 覆盖情况

| 排名 | CWE 编号 | CWE 名称 | 覆盖的 Skills |
|-----|---------|---------|--------------|
| 1 | CWE-79 | Cross-site Scripting (XSS) | xss |
| 2 | CWE-89 | SQL Injection | sql_injection |
| 4 | CWE-352 | Cross-Site Request Forgery (CSRF) | csrf |
| 5 | CWE-78 | OS Command Injection | command_injection |
| 6 | CWE-22 | Path Traversal | path_traversal_lfi_rfi |
| 7 | CWE-434 | Unrestricted Upload of File | insecure_file_uploads |
| 8 | CWE-502 | Deserialization of Untrusted Data | insecure_deserialization |
| 9 | CWE-287 | Improper Authentication | authentication_jwt |
| 10 | CWE-798 | Use of Hard-coded Credentials | security_configuration |
| 11 | CWE-918 | Server-Side Request Forgery (SSRF) | ssrf |
| 12 | CWE-362 | Race Condition | race_conditions |
| 13 | CWE-611 | XML External Entity (XXE) | xxe |
| 14 | CWE-94 | Code Injection | code_injection, ssti, llm_security |
| 15 | CWE-190 | Integer Overflow | integer_overflow |
| 16 | CWE-284 | Improper Access Control | broken_function_level_authorization |
| 17 | CWE-327 | Use of Broken Crypto Algorithm | cryptography, weak_cryptography |

---

## 📊 OWASP Top 10 (2021) 覆盖情况

| 类别 | OWASP Top 10 | 覆盖的 Skills | 主要 CWE |
|-----|-------------|--------------|---------|
| A01 | Broken Access Control | broken_function_level_authorization, idor | CWE-284, CWE-639 |
| A02 | Cryptographic Failures | cryptography, weak_cryptography | CWE-259, CWE-319, CWE-327, CWE-328, CWE-760 |
| A03 | Injection | sql_injection, nosql_injection, command_injection, code_injection, expression_injection, ldap_injection, xpath_injection, xxe, ssti, xss | CWE-77, CWE-78, CWE-79, CWE-89, CWE-90, CWE-94, CWE-611, CWE-643, CWE-917, CWE-943, CWE-1336 |
| A04 | Insecure Design | business_logic, payment | CWE-840, CWE-841, CWE-691 |
| A05 | Security Misconfiguration | security_configuration, csp | CWE-16, CWE-209, CWE-798, CWE-1021 |
| A06 | Vulnerable Components | - | - |
| A07 | Authentication Failures | authentication_jwt, session_and_auth, brute | CWE-287, CWE-307, CWE-384, CWE-400, CWE-501, CWE-613, CWE-614 |
| A08 | Software Integrity Failures | insecure_deserialization | CWE-502 |
| A09 | Security Logging Failures | - | - |
| A10 | Server-Side Request Forgery | ssrf | CWE-918 |

---

## 📊 完整 CWE 编号列表

以下是所有 34 个 Skills 覆盖的 43 个 CWE 编号完整列表：

| CWE 编号 | CWE 名称 | 覆盖的 Skills |
|---------|---------|--------------|
| CWE-16 | Configuration | security_configuration |
| CWE-22 | Path Traversal | path_traversal_lfi_rfi |
| CWE-74 | Injection | llm_security |
| CWE-77 | Command Injection | command_injection |
| CWE-78 | OS Command Injection | command_injection |
| CWE-79 | XSS | xss |
| CWE-89 | SQL Injection | sql_injection |
| CWE-90 | LDAP Injection | ldap_injection |
| CWE-94 | Code Injection | code_injection, ssti, llm_security |
| CWE-95 | Eval Injection | code_injection |
| CWE-96 | Static Code Injection | code_injection |
| CWE-98 | PHP File Inclusion | path_traversal_lfi_rfi |
| CWE-113 | HTTP Header Injection | http_header_injection |
| CWE-190 | Integer Overflow | integer_overflow |
| CWE-191 | Integer Underflow | integer_overflow |
| CWE-200 | Information Exposure | llm_security |
| CWE-209 | Error Message Information Exposure | security_configuration |
| CWE-259 | Hard-coded Password | weak_cryptography |
| CWE-284 | Improper Access Control | broken_function_level_authorization |
| CWE-285 | Improper Authorization | broken_function_level_authorization |
| CWE-287 | Improper Authentication | authentication_jwt |
| CWE-307 | Brute Force | brute |
| CWE-319 | Cleartext Transmission | cryptography |
| CWE-327 | Broken Crypto Algorithm | cryptography, weak_cryptography |
| CWE-328 | Weak Hash | cryptography |
| CWE-330 | Insufficient Randomness | weak_cryptography |
| CWE-347 | Signature Verification | authentication_jwt |
| CWE-352 | CSRF | csrf |
| CWE-362 | Race Condition | race_conditions |
| CWE-367 | TOCTOU Race Condition | race_conditions |
| CWE-384 | Session Fixation | session_and_auth |
| CWE-400 | Resource Consumption | brute |
| CWE-434 | Unrestricted File Upload | insecure_file_uploads |
| CWE-501 | Trust Boundary Violation | authentication_jwt |
| CWE-502 | Insecure Deserialization | insecure_deserialization |
| CWE-601 | Open Redirect | open_redirect |
| CWE-611 | XXE | xxe |
| CWE-613 | Insufficient Session Expiration | session_and_auth |
| CWE-614 | Sensitive Cookie Without Secure | session_and_auth |
| CWE-639 | IDOR | idor |
| CWE-643 | XPath Injection | xpath_injection |
| CWE-674 | Uncontrolled Recursion | uncontrolled_recursion |
| CWE-681 | Numeric Conversion Error | numeric_conversion_error |
| CWE-691 | Insufficient Control Flow | payment |
| CWE-760 | Predictable Salt | cryptography |
| CWE-798 | Hard-coded Credentials | security_configuration |
| CWE-840 | Business Logic Errors | business_logic, payment |
| CWE-841 | Improper Workflow Enforcement | business_logic |
| CWE-915 | Mass Assignment | mass_assignment |
| CWE-917 | Expression Injection | expression_injection |
| CWE-918 | SSRF | ssrf |
| CWE-943 | NoSQL Injection | nosql_injection |
| CWE-1021 | UI Layer Restriction | csp |
| CWE-1336 | Template Injection | ssti |

---

## 📚 参考资料

- **CWE 官方网站**: https://cwe.mitre.org/
- **CWE Top 25 (2023)**: https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html
- **OWASP Top 10 (2021)**: https://owasp.org/Top10/
- **数据来源**: `run_cwe_list.json`（CWE Juliet + OWASP Benchmark 测试数据集映射）

---

## 🎯 使用说明

### 1. 审计规划

根据目标项目的技术栈和业务场景，选择对应的 Skills：

```
示例：Java Web 应用安全审计
- sql_injection (CWE-89)
- xss (CWE-79)
- csrf (CWE-352)
- insecure_deserialization (CWE-502)
- broken_function_level_authorization (CWE-284)
- xxe (CWE-611)
- ssrf (CWE-918)
- path_traversal_lfi_rfi (CWE-22)
```

### 2. 报告生成

在漏洞报告中引用对应的 CWE 编号：

```
漏洞详情：
- CWE: CWE-89 (SQL Injection)
- CVSS: 9.8 (Critical)
- Skill: sql_injection
- 描述: 用户输入未经参数化直接拼接到 SQL 查询中
```

### 3. 合规性检查

对照安全标准验证覆盖情况：
- OWASP Top 10 (2021): 覆盖 8/10 类别
- CWE Top 25 (2023): 覆盖 17/25 条目
