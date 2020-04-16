(function () {

    let a = undefined;
    let defaultColor = null;
    let submission = false;
    let elementValue = 0;

    /**
     * @param options — Change default parameters
     * @param rule — Change default RegExp Rule
    */
    function Verification(options, rule) {
        const that = this;
        const _options = {
            className: "Verification",
            onBlur: function (ev) { that.obtainItemAttr(ev.srcElement) },
            onFocus: function (ev) { that.removeItemAttr(ev.srcElement) },
            verificationAttr: "ruleAttr",
            verificationMsg: "ruleMsg",
            successLabel: null,
            successMsg: "√",
            errorLabel: null,
            switchVeri: false,
            successStyle: "successStyle",
            errorStyle: 'errorStyle'
        }
        const validationRegExp = {
            phone: /^((13\d)|(14[57])|(15\d)|(17\d)|(18\d)|(19[98]))(\d)(\d{3})(\d{4})$/,
            card: /^(\d{6})(((19)|(20))(\d{2}))((0[^0])|(1[12]))(([012]\d)|(3[01]))(\d{2})(\d)(\d|x)$/,
            eamil: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            zh: /^[\u4E00-\u9FA5]{1,}$/,
            number: /^\d+$/,
            eupcaletters:/[A-Z]+/,
            elowealetters:/[a-z]+/,
            enumber:/\d+/,
            SpecialCharacters:/[!@#$%^&*()_+[\]\\;',./~ `]+/,
            qq: /^(([^0]\d{4})|([^0]\d{5})|([^0]\d{6})|([^0]\d{7})|([^0]\d{8})|([123]\d{9}))$/,
            password: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
            name: /^[\u4E00-\u9FA5]+(·|([\u4E00-\u9FA5])+)+?[\u4E00-\u9FA5]{0,12}$/,
            age: /^((\d)|([^0]\d)|(1[0123]\d))$/
        }

        let validationRule = {
            isNonEmpty: function (a, b) {
                b = b || " ";
                if (!a.length) return b;
            },
            minLength: function (a, c, b) {
                c = c || " ";
                if (a.length < parseInt(b)) return c;
            },
            maxLength: function (a, c, b) {
                c = c || " ";
                if (a.length > parseInt(b)) return c;
            },
            between: function (a, c, b) {
                c = c || " ";
                var d = parseInt(b.split('-')[0]);
                var e = parseInt(b.split('-')[1]);
                if (a.length < d || a.length > e) return c;
            },
            isPhone: function (a, b) {
                b = b || " ";
                if (!validationRegExp.phone.test(a)) return b;
            },
            isZh: function (a, b) {
                b = b || " ";
                if (!validationRegExp.zh.test(a)) return b;
            },
            isCard: function (a, b) {
                b = b || " ";
                if (!validationRegExp.card.test(a)) return b;
            },
            isEamil: function (a, b) {
                b = b || " ";
                if (!validationRegExp.eamil.test(a)) return b;
            },
            isQq: function (a, b) {
                b = b || " ";
                if (!validationRegExp.qq.test(a)) return b;
            },
            isNumber: function (a, b) {
                b = b || " ";
                if (!validationRegExp.number.test(a)) return b;
            },
            isPassword: function (a, b) {
                b = b || " ";
                if (!validationRegExp.password.test(a)) return b;
            },
            isName: function (a, b) {
                b = b || " ";
                if (!validationRegExp.name.test(a)) return b;
            },
            isAge: function (a, b) {
                b = b || " ";
                if (!validationRegExp.age.test(a)) return b;
            },
            existUpperLetters:function(a,b){
                b = b || " ";
                if (!validationRegExp.eupcaletters.test(a)) return b;
            },
            existLowerLetters:function(a,b){
                b = b || " ";
                if (!validationRegExp.elowealetters.test(a)) return b;
            },
            existNumber:function(a,b)
            {
                b = b || " ";
                if (!validationRegExp.enumber.test(a)) return b;
            },
            existSpecialChar:function(a,b)
            {
                b = b || " ";
                if (!validationRegExp.SpecialCharacters.test(a)) return b;
            }

        };

        let _rule = {
            validationRegExp: validationRegExp,
            validationRule: validationRule
        }
        this.rules = rule || _rule;  //规则
        this.options = options || _options; //选项
    }


    Verification.prototype = {
        /**
  * @param Object — Change default parameters
  * @param Object.className — 需要的验证的class
  * @param Object.verificationAttr — 属性参数
  * @param Object.verificationMsg —  匹配出错提示
  * @param Object.successLabel — 符合 添加DOM节点
  * @param Object.successMsg —   修改默认的符合信息
  * @param Object.errorLabel — 不符合 添加DOM节点
  * @param Object.switchVeri — 开关
  * @param Object.successStyle — 符合样式
  * @param Object.errorStyle —  匹配不符合样式
 */
        Init: function (o) {
            this.InitParameters(o);
            if (this.options.switchVeri)
                return;
            let VerificationItems = Array.prototype.slice.call(document.getElementsByClassName(this.options.className)) || [];
            let that = this;
            defaultColor = VerificationItems[0].style.borderColor;
            submission = 0;
            elementValue=VerificationItems.length;
            a = new Array(elementValue).fill(0);
            this.VerificationItems = VerificationItems;
            VerificationItems.map(function (item) {
                item.addEventListener('focus', that.options.onFocus);
                item.addEventListener('blur', that.options.onBlur);
            })
        },
        InitParameters: function (o) {
            if (o == null)
                return;
            for (const key in o) {
                this.options[key] = o[key];
            }
        },
        obtainItemAttr: function (curElement) {

            var that = this;
            var rule = curElement.getAttribute(that.options.verificationAttr) || false;
            var msg = curElement.getAttribute(that.options.verificationMsg) || false;
            if (!Boolean(rule) && Boolean(msg)) return new TypeError("Please use the parameters correctly");
            var ruleItem = rule.split("||");
            var msgItem = msg.split("||");
            var paraObject = [];
            ruleItem.forEach((item, index) => {
                let para = {
                    ruleItem: item,
                    msgItem: msgItem[index]
                }
                paraObject.push(para);
            })

            that.addItemVeri(curElement, paraObject);

        },
        removeItemAttr: function (curElement) {
            var that = this;
            let borderElement = curElement.parentElement.nextElementSibling.firstChild;
            curElement.style.borderColor = defaultColor;
            if (borderElement == null)
                return;
            let parentElement = curElement.parentElement.nextElementSibling;
            parentElement.removeChild(borderElement);
        },
        addItemVeri: function (curElement, paraObject) {
            var that = this;

            for (const [k, v] of Object.entries(paraObject)) {
                let ruleMethod = v.ruleItem.split("=")[0];
                let rulePara = v.ruleItem.split("=")[1];
                let inputValue = curElement.value;
                let msg = v.msgItem;
                let result = that.rules.validationRule[ruleMethod].call(that, inputValue, msg, rulePara);
                if (result != undefined) {
                    that.addErrorElement(curElement, result, that.options.errorLabel, that.options.errorStyle);
                    return;
                }
            }
            that.addSuccessElement(curElement, that.options.successMsg, that.options.errorLabel, that.options.successStyle);
        },
        addSuccessElement: function (curElement, result, successLabel, successClass) {
            let parentBorderElement = curElement.parentElement.nextElementSibling;
            if (successLabel != undefined) {
                successLabel.innerText = result;
                parentElement.appendChild(successLabel);
                return;
            }
            let successNode = document.createElement("div");
            successNode.setAttribute("class", successClass);
            let textNode = document.createElement("span");
            textNode.innerText = result;
            successNode.appendChild(textNode);
            parentBorderElement.appendChild(successNode);
            this.complete(curElement,true);
            
        },
        addErrorElement: function (curElement, result, errorLabel, errorClass) {
            let parentBorderElement = curElement.parentElement.nextElementSibling;
            if (errorLabel != undefined) {
                errorLabel.innerText = result;
                parentBorderElement.appendChild(errorLabel);
                return;
            }
            curElement.style.borderColor = "red";
            let errorNode = document.createElement("div");
            errorNode.setAttribute("class", errorClass);
            let textNode = document.createElement("span");
            textNode.innerText = result;
            errorNode.appendChild(textNode);
            parentBorderElement.appendChild(errorNode);
            this.complete(curElement,false);
        }, complete:function(curElement,flag){
            var that = this;
            that.VerificationItems.forEach((element,index) => {
                flag?(element==curElement?a[index]=1:null):(element==curElement?a[index]=0:null)
            });
            a.reduce(function(prev, cur) {
                return cur + prev;
            }, 0)==elementValue? submission=true:submission=false;
        }
    };



    // let o = {
    //     className: "Verification",
    //     verificationAttr: "ruleAttr",
    //     verificationMsg: "ruleMsg",
    //     successLabel: null,
    //     successMsg: "√",
    //     errorLabel: null,
    //     switchVeri: false,
    //     successStyle: "successStyle",
    //     errorStyle: 'errorStyle'
    // }


    let v = new Verification();
    window.verification = v.Init(/*o*/);
    window.submission= function(){return submission;}
    
})()