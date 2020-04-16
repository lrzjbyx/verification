# verification
 一个小型js验证库
```
验证规则
    isNonEmpty          不可为空白
    minLength           最小长度
    maxLength           最大长度
    between             选定长度范围
    isPhone             是否手机号码
    isZh                是否中文
    isCard              是否身份证号
    isEamil             是否邮箱
    isQq                是否QQ
    isNumber            是否数字
    isPassword          是否密码
    isName              是否中文名字
    isAge               是否年龄
    existUpperLetters   是否存在大写字符
    existLowerLetters   是否存在小写字符
    existNumber         是否存在数字
    existSpecialChar    是否存在特殊符号
```
## 使用方法
1.  创建创建html节点
```
    <div class="item">
        <div class="label">
        </div>
        <div class="input">
        </div>
        <div class="msg"></div>
    </div>
```
2.  添加标签和属性
- 1 添加验证名称和属性
```
    <div class="label"> <label for="">需要验证名称</label> </div>
    
```
- 2 添加验证规则和提示

   * 1 __验证的input标签需要添加**class="Verification"**属性__
   * 2 __验证的input标签需要添加**ruleAttr="isNumber||maxLength=20"**规则__
   * 3 __验证的input标签需要添加**ruleMsg="请输入数字||不能大于20位**__
   * 4 __"ruleAttr"和"ruleMsg"必须一一对应__
   * 5 __不同的验证规则或者验证提示信息用"||"分割__

```
    <div class="input">
        <input type="text" value="" class="Verification" ruleAttr="isNumber||maxLength=20"
                ruleMsg="请输入数字||不能大于20位">
    </div>
```
- 3 提示信息div
```
    <div class="msg">不放任何元素</div>
```
3.  提交
    * 1 __window.submission()获取验证是否全部通过__
```
    <div class="item">
        <div class="input" >
            <input type="button" value="提交" id = "submit">
        </div>
    </div> 
    
    <script type="text/javascript">

        document.getElementById("submit").addEventListener('click',function(e){
            console.log( window.submission());
            window.submission()?window.location.href='https://www.baidu.com':window.alert("您还有未完成选项");
        })

    </script>

```
3.  调用
```
   <script src="./Verification.js" type="text/javascript"></script>
```
