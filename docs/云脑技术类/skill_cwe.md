# BugKiller Skills CWE 映射表

本文档展示了 BugKiller 各个 Skill 与 CWE(Common Weakness Enumeration) 的映射关系。

## 概览

- **Skills 数量**: 34
- **覆盖 CWE 数量**: 43
- **CWE Top 25 覆盖率**: 17/25
- **OWASP Top 10 (2021) 覆盖率**: 8/10

---

## CWE 映射详情

| CWE 编号 | CWE 名称 | 中文描述 | 参考链接 | 对应 Skill |
|---------|---------|------|----------|-----------|
| CWE-16 | Configuration | 配置问题 | https://cwe.mitre.org/data/definitions/16.html | security_configuration |
| CWE-22 | Improper Limitation of a Pathname to a Restricted Directory | 路径遍历漏洞 | https://cwe.mitre.org/data/definitions/22.html | path_traversal_lfi_rfi |
| CWE-74 | Improper Neutralization of Special Elements in Output | 输出中特殊元素未正确处理 | https://cwe.mitre.org/data/definitions/74.html | llm_security |
| CWE-77 | Improper Neutralization of Special Elements used in a Command | 命令注入特殊元素未正确处理 | https://cwe.mitre.org/data/definitions/77.html | command_injection |
| CWE-78 | Improper Neutralization of Special Elements used in an OS Command | 操作系统命令注入 | https://cwe.mitre.org/data/definitions/78.html | command_injection |
| CWE-79 | Improper Neutralization of Input During Web Page Generation | 跨站脚本 XSS (网页生成时输入未正确处理) | https://cwe.mitre.org/data/definitions/79.html | xss |
| CWE-89 | Improper Neutralization of Special Elements used in an SQL Command | SQL 注入 (SQL 命令中特殊元素未正确处理) | https://cwe.mitre.org/data/definitions/89.html | sql_injection |
| CWE-90 | Improper Neutralization of Special Elements used in an LDAP Query | LDAP 注入 | https://cwe.mitre.org/data/definitions/90.html | ldap_injection |
| CWE-94 | Improper Control of Generation of Code | 代码生成控制不当 | https://cwe.mitre.org/data/definitions/94.html | code_injection, ssti, llm_security |
| CWE-95 | Improper Neutralization of Directives in Dynamically Evaluated Code | 动态代码执行指令未正确处理 (eval 注入) | https://cwe.mitre.org/data/definitions/95.html | code_injection |
| CWE-96 | Improper Neutralization of Directives in Statically Saved Code | 静态保存代码中指令未正确处理 | https://cwe.mitre.org/data/definitions/96.html | code_injection |
| CWE-98 | Improper Control of Filename for Include/Require Statement | Include/Require 文件名控制不当 | https://cwe.mitre.org/data/definitions/98.html | path_traversal_lfi_rfi |
| CWE-113 | Improper Neutralization of CRLF Sequences in HTTP Headers | HTTP 头部 CRLF 注入 | https://cwe.mitre.org/data/definitions/113.html | http_header_injection |
| CWE-190 | Integer Overflow or Wraparound | 整数溢出 | https://cwe.mitre.org/data/definitions/190.html | integer_overflow |
| CWE-191 | Integer Underflow | 整数下溢 | https://cwe.mitre.org/data/definitions/191.html | integer_overflow |
| CWE-200 | Exposure of Sensitive Information to an Unauthorized Actor | 敏感信息泄露给未授权用户 | https://cwe.mitre.org/data/definitions/200.html | llm_security |
| CWE-209 | Generation of Error Message Containing Sensitive Information | 错误消息包含敏感信息 | https://cwe.mitre.org/data/definitions/209.html | security_configuration |
| CWE-259 | Use of Hard-coded Password | 硬编码密码 | https://cwe.mitre.org/data/definitions/259.html | weak_cryptography |
| CWE-284 | Improper Access Control | 访问控制不当 | https://cwe.mitre.org/data/definitions/284.html | broken_function_level_authorization |
| CWE-285 | Improper Authorization | 授权机制不当 | https://cwe.mitre.org/data/definitions/285.html | broken_function_level_authorization |
| CWE-287 | Improper Authentication | 身份认证不当 | https://cwe.mitre.org/data/definitions/287.html | authentication_jwt |
| CWE-307 | Improper Restriction of Excessive Authentication Attempts | 认证尝试次数限制不当 (暴力破解) | https://cwe.mitre.org/data/definitions/307.html | brute |
| CWE-319 | Cleartext Transmission of Sensitive Information | 敏感信息明文传输 | https://cwe.mitre.org/data/definitions/319.html | cryptography |
| CWE-327 | Use of a Broken or Risky Cryptographic Algorithm | 使用已破解或有风险的加密算法 | https://cwe.mitre.org/data/definitions/327.html | cryptography, weak_cryptography |
| CWE-328 | Use of Weak Hash | 使用弱哈希算法 | https://cwe.mitre.org/data/definitions/328.html | cryptography |
| CWE-330 | Use of Insufficiently Random Values | 使用不充分的随机值 | https://cwe.mitre.org/data/definitions/330.html | weak_cryptography |
| CWE-347 | Improper Verification of Cryptographic Signature | 加密签名验证不当 | https://cwe.mitre.org/data/definitions/347.html | authentication_jwt |
| CWE-352 | Cross-Site Request Forgery (CSRF) | 跨站请求伪造 | https://cwe.mitre.org/data/definitions/352.html | csrf |
| CWE-362 | Concurrent Execution using Shared Resource with Improper Synchronization | 使用共享资源时同步机制不当 (竞态条件) | https://cwe.mitre.org/data/definitions/362.html | race_conditions |
| CWE-367 | Time-of-check Time-of-use (TOCTOU) Race Condition | 检查时间与使用时间竞态条件 | https://cwe.mitre.org/data/definitions/367.html | race_conditions |
| CWE-384 | Session Fixation | 会话固定攻击 | https://cwe.mitre.org/data/definitions/384.html | session_and_auth |
| CWE-400 | Uncontrolled Resource Consumption | 不受控制的资源消耗 (拒绝服务) | https://cwe.mitre.org/data/definitions/400.html | brute |
| CWE-434 | Unrestricted Upload of File with Dangerous Type | 危险类型文件上传限制不当 | https://cwe.mitre.org/data/definitions/434.html | insecure_file_uploads |
| CWE-501 | Trust Boundary Violation | 信任边界违反 | https://cwe.mitre.org/data/definitions/501.html | authentication_jwt |
| CWE-502 | Deserialization of Untrusted Data | 不受信任数据的反序列化 | https://cwe.mitre.org/data/definitions/502.html | insecure_deserialization |
| CWE-601 | URL Redirection to Untrusted Site | URL 重定向到不可信站点 (开放重定向) | https://cwe.mitre.org/data/definitions/601.html | open_redirect |
| CWE-611 | Improper Restriction of XML External Entity Reference | XML 外部实体引用限制不当 (XXE) | https://cwe.mitre.org/data/definitions/611.html | xxe |
| CWE-613 | Insufficient Session Expiration | 会话过期机制不足 | https://cwe.mitre.org/data/definitions/613.html | session_and_auth |
| CWE-614 | Sensitive Cookie in HTTPS Session Without 'Secure' Attribute | HTTPS 会话中敏感 Cookie 缺少 Secure 属性 | https://cwe.mitre.org/data/definitions/614.html | session_and_auth |
| CWE-639 | Authorization Bypass Through User-Controlled Key | 通过用户可控密钥绕过授权 (IDOR) | https://cwe.mitre.org/data/definitions/639.html | idor |
| CWE-643 | Improper Neutralization of Data within XPath Expressions | XPath 表达式中数据未正确处理 (XPath 注入) | https://cwe.mitre.org/data/definitions/643.html | xpath_injection |
| CWE-674 | Uncontrolled Recursion | 不受控制的递归 | https://cwe.mitre.org/data/definitions/674.html | uncontrolled_recursion |
| CWE-681 | Incorrect Conversion between Numeric Types | 数值类型转换错误 | https://cwe.mitre.org/data/definitions/681.html | numeric_conversion_error |
| CWE-691 | Insufficient Control Flow Management | 控制流管理不足 | https://cwe.mitre.org/data/definitions/691.html | payment |
| CWE-760 | Use of a One-Way Hash with a Predictable Salt | 使用可预测盐值的单向哈希 | https://cwe.mitre.org/data/definitions/760.html | cryptography |
| CWE-798 | Use of Hard-coded Credentials | 硬编码凭证 | https://cwe.mitre.org/data/definitions/798.html | security_configuration |
| CWE-840 | Business Logic Errors | 业务逻辑错误 | https://cwe.mitre.org/data/definitions/840.html | business_logic, payment |
| CWE-841 | Improper Enforcement of Behavioral Workflow | 行为工作流执行不当 | https://cwe.mitre.org/data/definitions/841.html | business_logic |
| CWE-915 | Improperly Controlled Modification of Dynamically-Determined Object Attributes | 动态确定对象属性的修改控制不当 (批量赋值) | https://cwe.mitre.org/data/definitions/915.html | mass_assignment |
| CWE-917 | Improper Neutralization of Special Elements used in an Expression Language Statement | 表达式语言中特殊元素未正确处理 (表达式注入) | https://cwe.mitre.org/data/definitions/917.html | expression_injection |
| CWE-918 | Server-Side Request Forgery (SSRF) | 服务端请求伪造 | https://cwe.mitre.org/data/definitions/918.html | ssrf |
| CWE-943 | Improper Neutralization of Special Elements in Data Query Logic | 数据查询逻辑中特殊元素未正确处理 (NoSQL 注入) | https://cwe.mitre.org/data/definitions/943.html | nosql_injection |
| CWE-1021 | Improper Restriction of Rendered UI Layers or Frames | 渲染 UI 层或框架限制不当 (点击劫持) | https://cwe.mitre.org/data/definitions/1021.html | csp |
| CWE-1336 | Improper Neutralization of Special Elements Used in a Template Engine | 模板引擎中特殊元素未正确处理 (SSTI) | https://cwe.mitre.org/data/definitions/1336.html | ssti |

---

## 各 Skill 对应的 CWE 列表

### authentication_jwt
- CWE-287: Improper Authentication
- CWE-347: Improper Verification of Cryptographic Signature
- CWE-501: Trust Boundary Violation

### broken_function_level_authorization
- CWE-284: Improper Access Control
- CWE-285: Improper Authorization

### brute
- CWE-307: Improper Restriction of Excessive Authentication Attempts
- CWE-400: Uncontrolled Resource Consumption

### business_logic
- CWE-840: Business Logic Errors
- CWE-841: Improper Enforcement of Behavioral Workflow

### code_injection
- CWE-94: Improper Control of Generation of Code
- CWE-95: Improper Neutralization of Directives in Dynamically Evaluated Code
- CWE-96: Improper Neutralization of Directives in Statically Saved Code

### command_injection
- CWE-77: Improper Neutralization of Special Elements used in a Command
- CWE-78: Improper Neutralization of Special Elements used in an OS Command

### cryptography
- CWE-319: Cleartext Transmission of Sensitive Information
- CWE-327: Use of a Broken or Risky Cryptographic Algorithm
- CWE-328: Use of Weak Hash
- CWE-760: Use of a One-Way Hash with a Predictable Salt

### csp
- CWE-1021: Improper Restriction of Rendered UI Layers or Frames

### csrf
- CWE-352: Cross-Site Request Forgery (CSRF)

### expression_injection
- CWE-917: Improper Neutralization of Special Elements used in an Expression Language Statement

### http_header_injection
- CWE-113: Improper Neutralization of CRLF Sequences in HTTP Headers

### idor
- CWE-639: Authorization Bypass Through User-Controlled Key

### insecure_deserialization
- CWE-502: Deserialization of Untrusted Data

### insecure_file_uploads
- CWE-434: Unrestricted Upload of File with Dangerous Type

### integer_overflow
- CWE-190: Integer Overflow or Wraparound
- CWE-191: Integer Underflow

### ldap_injection
- CWE-90: Improper Neutralization of Special Elements used in an LDAP Query

### llm_security
- CWE-74: Improper Neutralization of Special Elements in Output
- CWE-94: Improper Control of Generation of Code
- CWE-200: Exposure of Sensitive Information to an Unauthorized Actor

### mass_assignment
- CWE-915: Improperly Controlled Modification of Dynamically-Determined Object Attributes

### nosql_injection
- CWE-943: Improper Neutralization of Special Elements in Data Query Logic

### numeric_conversion_error
- CWE-681: Incorrect Conversion between Numeric Types

### open_redirect
- CWE-601: URL Redirection to Untrusted Site

### path_traversal_lfi_rfi
- CWE-22: Improper Limitation of a Pathname to a Restricted Directory
- CWE-98: Improper Control of Filename for Include/Require Statement

### payment
- CWE-691: Insufficient Control Flow Management
- CWE-840: Business Logic Errors

### race_conditions
- CWE-362: Concurrent Execution using Shared Resource with Improper Synchronization
- CWE-367: Time-of-check Time-of-use (TOCTOU) Race Condition

### security_configuration
- CWE-16: Configuration
- CWE-209: Generation of Error Message Containing Sensitive Information
- CWE-798: Use of Hard-coded Credentials

### session_and_auth
- CWE-384: Session Fixation
- CWE-613: Insufficient Session Expiration
- CWE-614: Sensitive Cookie in HTTPS Session Without 'Secure' Attribute

### sql_injection
- CWE-89: Improper Neutralization of Special Elements used in an SQL Command

### ssrf
- CWE-918: Server-Side Request Forgery (SSRF)

### ssti
- CWE-94: Improper Control of Generation of Code
- CWE-1336: Improper Neutralization of Special Elements Used in a Template Engine

### uncontrolled_recursion
- CWE-674: Uncontrolled Recursion

### weak_cryptography
- CWE-259: Use of Hard-coded Password
- CWE-327: Use of a Broken or Risky Cryptographic Algorithm
- CWE-330: Use of Insufficiently Random Values

### xpath_injection
- CWE-643: Improper Neutralization of Data within XPath Expressions

### xss
- CWE-79: Improper Neutralization of Input During Web Page Generation

### xxe
- CWE-611: Improper Restriction of XML External Entity Reference

---

## 参考资源

- **CWE 官方网站**: https://cwe.mitre.org/
- **CWE Top 25 (2023)**: https://cwe.mitre.org/top25/archive/2023/2023_top25_list.html
- **OWASP Top 10 (2021)**: https://owasp.org/Top10/
- **生成日期**: SKILL_CWE_映射表.md
