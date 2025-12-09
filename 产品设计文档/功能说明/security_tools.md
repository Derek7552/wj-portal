# 网络安全工具集合

本文档收集了网络安全中渗透测试和代码扫描常用的工具及其访问链接。

## 目录
- [渗透测试工具](#渗透测试工具)
- [代码扫描工具](#代码扫描工具)
- [综合安全平台](#综合安全平台)

---

## 渗透测试工具

### Web应用渗透测试

#### Burp Suite Community Edition
- **描述**: Web应用安全测试工具，用于拦截和修改HTTP/HTTPS请求（社区版免费）
- **官网**: https://portswigger.net/burp/communitydownload
- **许可证**: 社区版免费（功能有限）

#### OWASP ZAP (Zed Attack Proxy)
- **描述**: OWASP开发的免费开源Web应用安全扫描器
- **官网**: https://www.zaproxy.org/
- **GitHub**: https://github.com/zaproxy/zaproxy
- **许可证**: Apache 2.0

#### SQLMap
- **描述**: 自动化SQL注入检测和利用工具
- **官网**: http://sqlmap.org/
- **GitHub**: https://github.com/sqlmapproject/sqlmap
- **许可证**: GPL v2

#### Nikto
- **描述**: Web服务器扫描器，用于检测危险文件、CGI等
- **官网**: https://cirt.net/Nikto2
- **GitHub**: https://github.com/sullo/nikto
- **许可证**: GPL v2

#### Wfuzz
- **描述**: Web应用模糊测试工具，用于暴力破解和参数发现
- **官网**: https://wfuzz.readthedocs.io/
- **GitHub**: https://github.com/xmendez/wfuzz
- **许可证**: GPL v2

### 网络扫描与枚举

#### Nmap (Network Mapper)
- **描述**: 网络发现和安全审计工具
- **官网**: https://nmap.org/
- **GitHub**: https://github.com/nmap/nmap
- **许可证**: GPL v2

#### Masscan
- **描述**: 超快速网络端口扫描器
- **官网**: https://github.com/robertdavidgraham/masscan
- **GitHub**: https://github.com/robertdavidgraham/masscan
- **许可证**: AGPL v3


#### OpenVAS
- **描述**: 开源漏洞扫描和管理框架
- **官网**: https://www.openvas.org/
- **GitHub**: https://github.com/greenbone/openvas
- **许可证**: GPL

### 密码破解

#### John the Ripper
- **描述**: 快速密码破解工具
- **官网**: https://www.openwall.com/john/
- **GitHub**: https://github.com/openwall/john
- **许可证**: GPL v2

#### Hashcat
- **描述**: 高级密码恢复工具，支持GPU加速
- **官网**: https://hashcat.net/hashcat/
- **GitHub**: https://github.com/hashcat/hashcat
- **许可证**: MIT

#### Hydra
- **描述**: 网络登录暴力破解工具
- **官网**: https://github.com/vanhauser-thc/thc-hydra
- **GitHub**: https://github.com/vanhauser-thc/thc-hydra
- **许可证**: AGPL v3

### 漏洞利用框架

#### Metasploit Framework
- **描述**: 渗透测试框架，包含大量漏洞利用模块
- **官网**: https://www.metasploit.com/
- **GitHub**: https://github.com/rapid7/metasploit-framework
- **许可证**: BSD 3-Clause

#### Exploit-DB
- **描述**: 漏洞利用数据库和存档
- **官网**: https://www.exploit-db.com/
- **GitHub**: https://github.com/offensive-security/exploitdb

#### SearchSploit
- **描述**: Exploit-DB的命令行搜索工具
- **GitHub**: https://github.com/offensive-security/exploitdb

### 无线安全

#### Aircrack-ng
- **描述**: WiFi安全审计工具套件
- **官网**: https://www.aircrack-ng.org/
- **GitHub**: https://github.com/aircrack-ng/aircrack-ng
- **许可证**: GPL v2

#### Wireshark
- **描述**: 网络协议分析器
- **官网**: https://www.wireshark.org/
- **GitHub**: https://github.com/wireshark/wireshark
- **许可证**: GPL v2

### 社会工程学

#### Social Engineering Toolkit (SET)
- **描述**: 社会工程学攻击工具包
- **官网**: https://github.com/trustedsec/social-engineer-toolkit
- **GitHub**: https://github.com/trustedsec/social-engineer-toolkit
- **许可证**: BSD

#### Gophish
- **描述**: 开源钓鱼框架
- **官网**: https://getgophish.com/
- **GitHub**: https://github.com/gophish/gophish
- **许可证**: GPL v3

---

## 代码扫描工具

### 静态应用安全测试 (SAST)

#### SonarQube
- **描述**: 代码质量和安全分析平台
- **官网**: https://www.sonarqube.org/
- **GitHub**: https://github.com/SonarSource/sonarqube
- **许可证**: LGPL v3（社区版）

#### Semgrep
- **描述**: 快速、开源的静态分析工具
- **官网**: https://semgrep.dev/
- **GitHub**: https://github.com/returntocorp/semgrep
- **许可证**: LGPL 2.1

#### CodeQL
- **描述**: GitHub的语义代码分析引擎（开源CLI工具）
- **官网**: https://codeql.github.com/
- **GitHub**: https://github.com/github/codeql
- **许可证**: 开源（CLI工具免费使用）

#### Bandit
- **描述**: Python安全漏洞扫描器
- **官网**: https://bandit.readthedocs.io/
- **GitHub**: https://github.com/PyCQA/bandit
- **许可证**: Apache 2.0

#### Brakeman
- **描述**: Ruby on Rails安全扫描器
- **官网**: https://brakemanscanner.org/
- **GitHub**: https://github.com/presidentbeef/brakeman
- **许可证**: MIT

#### ESLint Security Plugin
- **描述**: ESLint的安全相关规则插件
- **官网**: https://github.com/nodesecurity/eslint-plugin-security
- **GitHub**: https://github.com/nodesecurity/eslint-plugin-security
- **许可证**: Apache 2.0

#### FindSecBugs
- **描述**: FindBugs的Java安全漏洞检测插件
- **官网**: https://find-sec-bugs.github.io/
- **GitHub**: https://github.com/find-sec-bugs/find-sec-bugs
- **许可证**: LGPL

#### Gosec
- **描述**: Go语言安全扫描器
- **官网**: https://github.com/securego/gosec
- **GitHub**: https://github.com/securego/gosec
- **许可证**: Apache 2.0

#### SpotBugs (原FindBugs)
- **描述**: Java静态分析工具
- **官网**: https://spotbugs.github.io/
- **GitHub**: https://github.com/spotbugs/spotbugs
- **许可证**: LGPL

### 软件组成分析 (SCA) / 依赖扫描

#### OWASP Dependency-Check
- **描述**: 检测项目依赖中的已知漏洞
- **官网**: https://owasp.org/www-project-dependency-check/
- **GitHub**: https://github.com/jeremylong/DependencyCheck
- **许可证**: Apache 2.0

#### Snyk Open Source
- **描述**: 开源依赖漏洞扫描和修复（开源版本）
- **官网**: https://snyk.io/
- **GitHub**: https://github.com/snyk/snyk
- **许可证**: Apache 2.0（开源版本免费）

#### GitHub Dependabot
- **描述**: GitHub的依赖更新和安全警报服务
- **官网**: https://github.com/dependabot
- **文档**: https://docs.github.com/en/code-security/dependabot

#### npm audit
- **描述**: npm包的安全审计工具
- **文档**: https://docs.npmjs.com/cli/v8/commands/npm-audit

#### Safety
- **描述**: Python依赖安全检查工具
- **官网**: https://pyup.io/safety/
- **GitHub**: https://github.com/pyupio/safety
- **许可证**: MIT

#### Retire.js
- **描述**: JavaScript库漏洞检测
- **官网**: https://retirejs.github.io/retire.js/
- **GitHub**: https://github.com/RetireJS/retire.js
- **许可证**: Apache 2.0

### 容器安全扫描

#### Trivy
- **描述**: 容器和文件系统漏洞扫描器
- **官网**: https://aquasecurity.github.io/trivy/
- **GitHub**: https://github.com/aquasecurity/trivy
- **许可证**: Apache 2.0

#### Clair
- **描述**: 容器漏洞静态分析
- **官网**: https://github.com/quay/clair
- **GitHub**: https://github.com/quay/clair
- **许可证**: Apache 2.0

#### Anchore Engine
- **描述**: 容器镜像安全扫描
- **官网**: https://anchore.com/
- **GitHub**: https://github.com/anchore/anchore-engine
- **许可证**: Apache 2.0

#### Docker Bench Security
- **描述**: Docker安全配置检查
- **GitHub**: https://github.com/docker/docker-bench-security
- **许可证**: Apache 2.0

### 基础设施即代码 (IaC) 扫描

#### Checkov
- **描述**: 基础设施即代码静态分析
- **官网**: https://www.checkov.io/
- **GitHub**: https://github.com/bridgecrewio/checkov
- **许可证**: Apache 2.0

#### Terrascan
- **描述**: 基础设施即代码静态分析工具
- **官网**: https://runterrascan.io/
- **GitHub**: https://github.com/tenable/terrascan
- **许可证**: Apache 2.0

#### Tfsec
- **描述**: Terraform安全扫描器
- **官网**: https://tfsec.dev/
- **GitHub**: https://github.com/aquasecurity/tfsec
- **许可证**: MIT

#### Kube-bench
- **描述**: Kubernetes CIS基准测试工具
- **官网**: https://github.com/aquasecurity/kube-bench
- **GitHub**: https://github.com/aquasecurity/kube-bench
- **许可证**: Apache 2.0

### 动态应用安全测试 (DAST)

#### OWASP ZAP (Zed Attack Proxy)
- **描述**: 动态应用安全测试工具
- **官网**: https://www.zaproxy.org/
- **GitHub**: https://github.com/zaproxy/zaproxy
- **许可证**: Apache 2.0

---

## 综合安全平台

### 漏洞管理

#### OpenVAS
- **描述**: 开源漏洞扫描和管理
- **官网**: https://www.openvas.org/
- **GitHub**: https://github.com/greenbone/openvas
- **许可证**: GPL

### 安全编排与自动化

#### TheHive
- **描述**: 安全事件响应平台
- **官网**: https://thehive-project.org/
- **GitHub**: https://github.com/TheHive-Project/TheHive
- **许可证**: AGPL v3

#### MISP (Malware Information Sharing Platform)
- **描述**: 威胁情报共享平台
- **官网**: https://www.misp-project.org/
- **GitHub**: https://github.com/MISP/MISP
- **许可证**: AGPL v3

---

## 工具分类总结

### 按许可证类型
- **开源免费**: 本文档中所有工具均为开源或免费版本

### 按使用场景
- **Web应用测试**: Burp Suite Community, OWASP ZAP, SQLMap
- **代码扫描**: SonarQube, Semgrep, CodeQL
- **依赖扫描**: OWASP Dependency-Check, Snyk, Dependabot
- **容器安全**: Trivy, Clair, Anchore
- **基础设施扫描**: Checkov, Terrascan, Tfsec

---

## 参考资源

### OWASP项目
- **OWASP官网**: https://owasp.org/
- **OWASP Top 10**: https://owasp.org/www-project-top-ten/
- **OWASP Testing Guide**: https://owasp.org/www-project-web-security-testing-guide/

### 安全学习资源
- **Hack The Box**: https://www.hackthebox.com/
- **TryHackMe**: https://tryhackme.com/
- **PentesterLab**: https://pentesterlab.com/
- **PortSwigger Web Security Academy**: https://portswigger.net/web-security

### 漏洞数据库
- **CVE数据库**: https://cve.mitre.org/
- **NVD (National Vulnerability Database)**: https://nvd.nist.gov/
- **Exploit-DB**: https://www.exploit-db.com/

---

## 更新日志

- **2024**: 初始版本，收集常用渗透测试和代码扫描工具
- **2024**: 更新版本，移除商业工具，仅保留开源和免费工具

---

**注意**: 
- 工具链接和许可证信息可能会随时间变化，请访问官方网站获取最新信息
- 使用这些工具时请确保遵守相关法律法规，仅在授权范围内进行安全测试
- 本文档仅收录开源和免费工具，部分工具可能有功能限制的免费版本

