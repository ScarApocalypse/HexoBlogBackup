---
title: JavaScript重要基础
date: 2019-07-31 20:19:09
tags: JavaScript
---

## 正文

### with关键字

[网页链接](http://www.jb51.net/article/79474.htm)



with语句的作用是将代码的作用域设置到一个特定的作用域中


基本语法如下：

`with (expression) statement; `


使用with关键字的目的是为了简化多次编写访问同一对象的工作，比如下面的例子：
```javascript
var qs = location.search.substring(1);
var hostName = location.hostname;
var url = location.href;
```
<!-- more  -->

这几行代码都是访问location对象中的属性，如果使用with关键字的话，可以简化代码如下

```javascript
with (location){
    var qs = search.substring(1); 
    var hostName = hostname;  
    var url = href;
}
```

在这段代码中，使用了with语句关联了location对象，这就以为着在with代码块内部，每个变量首先被认为是一个局部变量，如果局部变量与location对象的某个属性同名，则这个局部变量会指向location对象属性。



>注意：在严格模式下不能使用with语句。



#### with关键字的弊端
1. 性能问题
2. 语义不明，调试困难




### slice() 
[网页链接](http://www.w3school.com.cn/jsref/jsref_slice_array.asp)

slice() 方法可从已有的数组中返回选定的元素。

#### 语法
arrayObject.slice(start,end)
* start	必需。规定从何处开始选取。如果是负数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。
* end	可选。规定从何处结束选取。该参数是数组片断结束处的数组下标。如果没有指定该参数，那么切分的数组包含从 start 到数组结束的所有元素。如果这个参数是负数，那么它规定的是从数组尾部开始算起的元素。
#### 返回值
返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素。
#### 说明
请注意，该方法并不会修改数组，而是返回一个子数组。如果想删除数组中的一段元素，应该使用方法 Array.splice()。

---


在本例中，我们将创建一个新数组，然后显示从其中选取的元素：
```javascript
<script type="text/javascript">
var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

document.write(arr + "<br />")
document.write(arr.slice(1) + "<br />")
document.write(arr)

</script>
输出：
George,John,Thomas
John,Thomas
George,John,Thomas
```

在本例中，我们将创建一个新数组，然后显示从其中选取的元素：
```javascript
<script type="text/javascript">

var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

document.write(arr + "<br />")
document.write(arr.slice(2,4) + "<br />")
document.write(arr)

</script>
输出：
George,John,Thomas,James,Adrew,Martin
Thomas,James
George,John,Thomas,James,Adrew,Martin
```

---


* **splice() 该方法会改变原始数组。**
* **slice() 该方法不会改变原始数组。**


---


[网页链接](https://www.zhihu.com/question/56690271?sort=created)


slice()只是一层复制
遇到非基本类型只是简单赋值引用
并没有递归
是浅复制

#### 源码

```javascript
function ArraySlice(start, end) {
  CHECK_OBJECT_COERCIBLE(this, "Array.prototype.slice");

  var array = TO_OBJECT(this);
  var len = TO_LENGTH(array.length);
  var start_i = TO_INTEGER(start);
  var end_i = len;

  if (!IS_UNDEFINED(end)) end_i = TO_INTEGER(end);

  if (start_i < 0) {
    start_i += len;
    if (start_i < 0) start_i = 0;
  } else {
    if (start_i > len) start_i = len;
  }

  if (end_i < 0) {
    end_i += len;
    if (end_i < 0) end_i = 0;
  } else {
    if (end_i > len) end_i = len;
  }

  var result = ArraySpeciesCreate(array, MaxSimple(end_i - start_i, 0));

  if (end_i < start_i) return result;

  if (UseSparseVariant(array, len, IS_ARRAY(array), end_i - start_i)) {
    %NormalizeElements(array);
    if (IS_ARRAY(result)) %NormalizeElements(result);
    SparseSlice(array, start_i, end_i - start_i, len, result);
  } else {
    SimpleSlice(array, start_i, end_i - start_i, len, result);
  }

  result.length = end_i - start_i;

  return result;
}

function SimpleSlice(array, start_i, del_count, len, deleted_elements) {
  for (var i = 0; i < del_count; i++) {
    var index = start_i + i;
    if (index in array) {
      var current = array[index];
      %CreateDataProperty(deleted_elements, i, current);
    }
  }
}
```

#### 代码证明
```javascript
const a = [1, 2, 3]
const b = a
a === b // true
```

```javascript
const a = [1, 2, 3]
const b = a.slice(0)
a === b // false
```

```javascript
const a = [{ prop: 1 }, { prop: 2 }]
const b = a.slice(0)
a === b // false
a[0] === b[0] // true
```



**可以很清晰地看出：只有第一层是深拷贝**










### splice
[网页链接](http://www.w3school.com.cn/jsref/jsref_splice.asp)

#### 定义和用法
splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目。
注释：该方法会改变原始数组。
#### 语法
arrayObject.splice(index,howmany,item1,.....,itemX)

* index	
  必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
* howmany	
   必需。要删除的项目数量。如果设置为 0，则不会删除项目。
* item1, ..., itemX	
   可选。向数组添加的新项目。
#### 返回值
Array	包含被删除项目的新数组，如果有的话。
#### 说明
splice() 方法可删除从 index 处开始的零个或多个元素，并且用参数列表中声明的一个或多个值来替换那些被删除的元素。
如果从 arrayObject 中删除了元素，则返回的是含有被删除的元素的数组。


---


在本例中，我们将创建一个新数组，并向其添加一个元素：
```javascript
<script type="text/javascript">

var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

document.write(arr + "<br />")
arr.splice(2,0,"William")
document.write(arr + "<br />")

</script>
输出：
George,John,Thomas,James,Adrew,Martin
George,John,William,Thomas,James,Adrew,Martin
```
在本例中我们将删除位于 index 2 的元素，并添加一个新元素来替代被删除的元素：
```javascript
<script type="text/javascript">

var arr = new Array(6)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"
arr[3] = "James"
arr[4] = "Adrew"
arr[5] = "Martin"

document.write(arr + "<br />")
arr.splice(2,1,"William")
document.write(arr)

</script>
输出：
George,John,Thomas,James,Adrew,Martin
George,John,William,James,Adrew,Martin
```



#### 在for循环中使用可能会遇到的坑

[https://blog.csdn.net/a727911438/article/details/55224532](https://blog.csdn.net/a727911438/article/details/55224532)

```javascript
    var arr = new Array(1, 2, 3, 4, 5);     //初始化数字集合  
    var delete_number = 3;    //要被删除的数字  
      
    //遍历数组  
    for(var i=0; i<arr.length; i++){  
        if(arr[i] === delete_number){   //如果找到要被删除的数字所在的数组下标  
            var num = arr.splice( i, 1 );   //从i位置开始删除1个数字  
            console.log("成功删除 "+num);    //输出被删除的数字  
        }  
        else{  
            console.log(arr[i]+" 未被删除");    //如果i下标的数组元素不是需要被删除的数字，就输出数字  
        }  
    }  
```
输出
```
1 未被删除
2 未被删除
成功删除 3
5 未被删除
```

splice 是直接操作并修改数组的，所以当找到数字3时在循环中的 i 下标是2，而当删除数字3后，数组下标 i 位置中保存的数字变为了数字4，然后到了下一个循环 i 下标为3时，数组下标 i 位置中保存的数字是5，所以跳过了数字4


**解决方案**

```javascript
    if(arr[i] === delete_number){   //如果找到要被删除的数字所在的数组下标  
        var num = arr.splice( i, 1 );   //从i位置开始删除1个数字  
        console.log("成功删除 "+num);    //输出被删除的数字  
          
        i = i-1;    //解决方案  
    }  
```
或者

**采用逆循环的方式**

```javascript
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === delete_number) {   //如果找到要被删除的数字所在的数组下标
            var num = arr.splice(i, 1);   //从i位置开始删除1个数字
            console.log("成功删除 " + num);    //输出被删除的数字
        }
        else {
            console.log(arr[i] + " 未被删除");    //如果i下标的数组元素不是需要被删除的数字，就输出数字
        }
    }
```

### toFixed和fixed

[网页链接](http://www.w3school.com.cn/jsref/jsref_tofixed.asp)

toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。

#### 语法
NumberObject.toFixed(num)

num	必需。规定小数的位数，是 0 ~ 20 之间的值，包括 0 和 20，有些实现可以支持更大的数值范围。如果省略了该参数，将用 0 代替。

```javascript
Show the number 13.37 with one decimal:
<script type="text/javascript">
var num = new Number(13.37);
document.write (num.toFixed(1))
</script>
输出：
Show the number 13.37 with one decimal:
13.4
```
---
fixed() 方法用于把字符串显示为打字机字体。
stringObject.fixed()



### JS中的“use strict” 严格模式

[网页链接](https://www.cnblogs.com/liaojie970/p/7154144.html)

ECMAScript 5 引入严格模式('strict mode')概念。通过严格模式，在函数内部选择进行较为严格的全局或局部的错误条件检测，使用严格模式的好处是可以提早知道代码中的存在的错误，

**及时捕获一些可能导致编程错误的ECMAScript行为**，在开发中使用严格模式能帮助我们早发现错误。


#### 严格模式影响范围
* 变量：  var、delete、变量关键字
* 对象： 只读属性、 对象字面量属性重复申明
* 函数：参数重名、arguments对象、申明
* 其他：this、eval、关键字...


----------


设立"严格模式"的目的，主要有以下几个：错误检测、规范、效率、安全、面向未来
* 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
* 消除代码运行的一些不安全之处，保证代码运行的安全；
* 提高编译器效率，增加运行速度；
* 为未来新版本的Javascript做好铺垫。


进入"严格模式"的编译指示（pragma），是下面这行语句：　　
`"use strict";`

将"use strict"放在脚本文件的第一行，则整个脚本都将以"严格模式"运行。

如果这行语句不在第一行，则无效，整个脚本以"正常模式"运行。

如果不同模式的代码文件合并成一个文件，这一点需要特别注意。




### Object.create(proto [, propertiesObject ]) 

propertiesObject 参数的详细解释：（默认都为false）
数据属性： 
* writable:是否可任意写 
* configurable：是否能够删除，是否能够被修改 
* enumerable：是否能用 for in 枚举 
* value：值 
访问属性：
* get(): 访问
* set(): 设置


```javascript
		newObj = Object.create(obj, {
			t1: {
				value: 'yupeng',
				writable: true
			},
			bar: {
				configurable: false,
				get: function() {
					return bar;
				},
				set: function(value) {
					bar = value
				}
			}
		})
```


通过 Object.create() 方法，使用一个指定的原型对象和一个额外的属性对象创建一个新对象。这是一个用于对象创建、继承和重用的强大的新接口。说直白点，就是一个新的对象可以继承一个对象的属性，并且可以自行添加属性。

#### 用 Object.create实现类式继承
```javascript
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

// 因为使用“.prototype =...”后,constructor会改变为“=...”的那个
// constructor，所以要重新指定.constructor 为自身。
var rect = new Rectangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Rectangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'
```




### padStart()，padEnd()
ES6 引入了字符串补全长度的功能，如果某个字符串不够指定长度，会在头部活尾部补全。


* padStart() 用于头部补全；
* padEnd() 用于尾部补全。

```javascript

'x'.padStart(5, 'ab') // 'ababx'
'x'.padStart(4, 'ab') // 'abax'
 
'x'.padEnd(5, 'ab') // 'xabab'
'x'.padEnd(4, 'ab') // 'xaba'
```


### for-of 和 for-in


[网页链接](http://www.infoq.com/cn/articles/es6-in-depth-iterators-and-the-for-of-loop)


自ES5正式发布后，你可以使用内建的forEach方法来遍历数组：
```javascript
myArray.forEach(function (value) {
console.log(value);
});
```
这段代码看起来更加简洁，但这种方法也有一个小缺陷：你不能使用break语句中断循环，也不能使用return语句返回到外层函数。

#### for-in循环
```
for (var index in myArray) { // 千万别这样做
  console.log(myArray[index]);
}
```
这绝对是一个糟糕的选择，为什么呢？

* 在这段代码中，赋给index的值不是实际的数字，而是字符串“0”、“1”、“2”，此时很可能在无意之间进行字符串算数计算，例如：“2” + 1 == “21”，这给编码过程带来极大的不便。
* 作用于数组的for-in循环体除了遍历数组元素外，还会遍历自定义属性。举个例子，如果你的数组中有一个可枚举属性`myArray.name`，循环将额外执行一次，遍历到名为“name”的索引。就连数组原型链上的属性都能被访问到。
* 最让人震惊的是，在某些情况下，这段代码可能按照随机顺序遍历数组元素。
* **简而言之，for-in是为普通对象设计的，你可以遍历得到字符串类型的键，因此不适用于数组遍历。**

#### 强大的for-of循环
```javascript
for (var value of myArray) {
  console.log(value);
}
```

是的，与之前的内建方法相比，这种循环方式看起来是否有些眼熟？那好，我们将要探究一下for-of循环的外表下隐藏着哪些强大的功能。现在，只需记住：

* 这是最简洁、最直接的遍历数组元素的语法
* 这个方法避开了for-in循环的所有缺陷
* 与forEach()不同的是，它可以正确响应break、continue和return语句


**for-in循环用来遍历对象属性。
for-of循环用来遍历数据 — 例如数组中的值。**

#### for-of循环也可以遍历其它的集合

for-of循环不仅支持数组，还支持大多数类数组对象，例如DOM NodeList对象。

for-of循环也支持字符串遍历，它将字符串视为一系列的Unicode字符来进行遍历：
```
for (var chr of "") {
  alert(chr);
}
```

它同样支持Map和Set对象遍历

举个例子，Set对象可以自动排除重复项：
```
// 基于单词数组创建一个set对象
var uniqueWords = new Set(words);
生成Set对象后，你可以轻松遍历它所包含的内容：
for (var word of uniqueWords) {
   console.log(word);
}
```

Map对象稍有不同：内含的数据由键值对组成，所以你需要使用解构（destructuring）来将键值对拆解为两个独立的变量：

```
for (var [key, value] of phoneBookMap) {
   console.log(key + "'s phone number is: " + value);
}
```
for-of就是为遍历所有这些集合特别设计的循环语句。

**但是for-of循环不支持普通对象**

如果你想迭代一个对象的属性，你可以用for-in循环（这也是它的本职工作）或内建的Object.keys()方法：

```
// 向控制台输出对象的可枚举属性
for (var key of Object.keys(someObject)) {
  console.log(key + ": " + someObject[key]);
}
```




那么我们只想循环对应的对象该怎么做呢，这里引入hasOwnProperty()方法，hasOwnProperty()函数用于指示一个对象自身(不包括原型链)是否具有指定名称的属性。如果有，返回true，否则返回false。

```javascript
var obj = {
    name:"echolun",
    age:"24",
    sex:"male"
},
objName=[], //用来装对象属性名
objVal=[];  //用来装对象属性值
Object.prototype.game="lastgame";
for(var i in obj){
    if(obj.hasOwnProperty(i)) {
        objName.push(i);
        objVal.push(obj[i]);
    }
}
console.log(objName,objVal);
}
```






例如：
```javascript
let arr = ["a","b"];
for (let a in arr) {
    console.log(a);//0,1
}

for (let a of arr) {
    console.log(a);//a,b
}
```

由于for of的这个特性，他还可以实现对iterator对象的遍历，而for in就是简单的遍历了。



>for in是ES5标准,for of是ES6标准

 



### ||和&&的高级用法





[网页链接](https://segmentfault.com/a/1190000002454280)


#### 用于赋值
* &&:从左往右依次判断，当当前值为true则继续，为false则返回此值。是返回未转换为布尔值时的原值
* ||:从左往右依次判断，当当前值为false则继续，为true则返回此值。是返回未转换为布尔值时的原值





```
// => aaa
var attr = true && 4 && "aaa";

// => 0
var attr = true && 0 && "aaa";
```







```
// => 100
var attr = 100 || 12;

// => e
var attr = "e" || "hahaha"

// => hahaha
var attr = "" || "hahaha"
```

#### 经过多次判断的赋值




```
/*
x>=15时 => 4
x>=12时 => 3
x>=10时 => 2
x>=5时 => 1
x<5时 => 0
*/
console.log((x>=15 && 4) || (x>=12 && 3) || (x>=10 && 2) || (x>=5 && 1) || 0);
```


#### 与对象形式的变量合体



```
/*
x=15 时 => 4
x=12 时 => 3
x=10 时 => 2
x=5 时 => 1
其它 => 0
*/
console.log( {'5':1,'10':2,'12':3,'15':4}[x] || 0 );
```

#### 用于执行语句






```
if(a >=5){alert("你好");}
//可以写成： 
a >= 5 && alert("你好");
```






### eval() 函数



[网页链接](http://www.w3school.com.cn/jsref/jsref_eval.asp)

##### 定义和用法
eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

#### 语法
eval(string)
string  	必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。

返回值  通过计算 string 得到的值（如果有的话）。

#### 说明
该方法只接受原始字符串作为参数，如果 string 参数不是原始字符串，那么该方法将不作任何改变地返回。因此请不要为 eval() 函数传递 String 对象来作为参数。

如果试图覆盖 eval 属性或把eval()方法赋予另一个属性，并通过该属性调用它，则 ECMAScript 实现允许抛出一个 EvalError 异常。

#### 提示和注释
虽然 eval() 的功能非常强大，但在实际使用中用到它的情况并不多。

#### 实例
```javascript
<script type="text/javascript">

eval("x=10;y=20;document.write(x*y)")

document.write(eval("2+2"))

var x=10
document.write(eval(x+17))

</script>

输出：
200
4
27
```

```javascript
eval("2+3")	// 返回 5
var myeval = eval;	// 可能会抛出 EvalError 异常
myeval("2+3");	// 可能会抛出 EvalError 异常
```
可以使用下面这段代码来检测 eval() 的参数是否合法：
```javascript
try  {
     alert("Result:" + eval(prompt("Enter an expression:","")));
     }

catch(exception) {
     alert(exception);
     }
```


----------
js中这个函数eval（）对json数据有什么用？那eval( '(' + content + ')' )里边为什么要加引号呢？ 


对于服务器返回的JSON字符串，如果jquery异步请求没做类型说明，或者以字符串方式接受，那么需要做一次对象化处理，方式不是太麻烦，就是将该字符串放于eval()中执行一次。这种方式也适合以普通javascipt方式获取json对象，以下举例说明：

var dataObj=eval("("+data+")");//转换为json对象
为什么要 eval这里要添加 “("("+data+")");//”呢？

原因在于：eval本身的问题。 由于json是以”{}”的方式来开始以及结束的，在JS中，它会被当成一个语句块来处理，所以必须强制性的将它转换成一种表达式。

**加上圆括号的目的是迫使eval函数在处理JavaScript代码的时候强制将括号内的表达式（expression）转化为对象，而不是作为语 句（statement）来执行。**


举一个例子，例如对象字面量{}，如若不加外层的括号，那么eval会将大括号识别为JavaScript代码块的开始 和结束标记，那么{}将会被认为是执行了一句空语句。所以下面两个执行结果是不同的：

```javascript
alert(eval("{}"); // return undefined
alert(eval("({})");// return object[Object]
```




### JS闭包

[网页链接](http://www.runoob.com/js/js-function-closures.html)

当function里嵌套function时，内部的function可以访问外部function里的变量。

<strong>闭包是可访问上一层函数作用域里变量的函数，即便上一层函数已经关闭。</strong>

闭包就是一个函数引用另一个函数的变量，因为变量被引用着所以不会被回收，因此可以用来封装一个私有变量。这是优点也是缺点，不必要的闭包只会增加内存消耗。
或者说闭包就是子函数可以使用父函数的局部变量，还有父函数的参数。


```javascript
function foo(x) {
    var tmp = 3;
    function bar(y) {
        alert(x + y + (++tmp));
    }
    bar(10);
}
foo(2)
```
不管执行多少次，都会alert16，因为bar能访问foo的参数x，也能访问foo的变量tmp。但，这还不是闭包。当你return的是内部function时，就是一个闭包。内部function会close-over外部function的变量直到内部function结束。
```javascript
function foo(x) {
    var tmp = 3;
    return function (y) {
        alert(x + y + (++tmp));
    }
}
var bar = foo(2); // bar 现在是一个闭包
bar(10);
```
上面的脚本最终也会alert16，因为虽然bar不直接处于foo的内部作用域，但bar还是能访问x和tmp。
但是，由于tmp仍存在于bar闭包的内部，所以它还是会自加1，而且你每次调用bar时它都会自加1.


----------


如果在一个大函数中有一些代码能够独立出来， 我们常常把这些代码封装在独立的的小函数里面。独立出来的小函数有助于代码复用，如果这些小函数有一个良好的命名，它们本身也起到了注释的作用。如果这些小函数不需要在程序的其他地方使用，最好是它们用闭包封装起来




```javascript
  var mult = (function () {
        var cache = {}
        var calculate = function () {
            //封闭calculate函数
            var a = 1
            for (var i = 0, l = arguments.length; i < l; i++) {
                a = a * arguments[i]
            }
            return a
        }


        return function () {
            var args = Array.prototype.join.call(arguments, ',')
            if (args in cache) {
                return cache[args]
            }
            return cache[args] = calculate.apply(null, arguments)
        }
    })()
```






### BOM和DOM详解




[网页链接](http://blog.csdn.net/anythings/article/details/51240133)


####  DOM：
DOM 全称是 Document Object Model，也就是文档对象模型。

DOM 就是针对 HTML 和 XML 提供的一个API。什么意思？就是说为了能以编程的方法操作这个 HTML 的内容（比如添加某些元素、修改元素的内容、删除某些元素），我们把这个 HTML 看做一个对象树（DOM树），它本身和里面的所有东西比如 <div></div> 这些标签都看做一个对象，每个对象都叫做一个节点（node），节点可以理解为 DOM 中所有 Object 的父类。

![enter description here][1]


DOM 有什么用？就是为了操作 HTML 中的元素，比如说我们要通过 JS 把这个网页的标题改了，直接这样就可以了：

```
document.title = 'how to make love';

```

这个 API 使得在网页被下载到浏览器之后改变网页的内容成为可能。


#### document

当浏览器下载到一个网页，通常是 HTML，这个 HTML 就叫 document（当然，这也是 DOM 树中的一个 node），从上图可以看到，document 通常是整个 DOM 树的根节点。这个 document包含了标题（document.title）、URL（document.URL）等属性，可以直接在 JS 中访问到。在一个浏览器窗口中可能有多个 document，例如，通过 iframe 加载的页面，每一个都是一个 document。在 JS 中，可以通过 document 访问其子节点（其实任何节点都可以），如

```
document.body;
document.getElementById('xxx');
```

#### BOM

BOM 是 Browser Object Model，浏览器对象模型。

刚才说过 DOM 是为了操作文档出现的接口，那 BOM 顾名思义其实就是为了**控制浏览器的行为**而出现的接口。

浏览器可以做什么呢？比如跳转到另一个页面、前进、后退等等，程序还可能需要获取屏幕的大小之类的参数。

所以 BOM 就是为了解决这些事情出现的接口。比如我们要让浏览器跳转到另一个页面，只需要

```
location.href = "http://www.xxxx.com";
```
这个 location 就是 BOM 里的一个对象。




### object类型里的键值

 
[网页链接](http://www.cnblogs.com/yuqingfamily/articles/5798928.html)

```javascript
var obj = {"name1":"张三","name2":"李四"}; 
var key = "name1"; 
var value = obj.key;//得到了"undefined" 
value = obj.name1;//得到了"张三" 
```

其实我是想动态给key赋值，然后得到key为多少所对就的值。但这种做法行不通，obj.key会去找obj下key为"key"所对应的值，结果当然是找不到喽。 
于是，我想到了js中遍历对象属性的方法：

```javascript
function printObject(obj){ 
//obj = {"cid":"C0","ctext":"区县"}; 
var temp = ""; 
for(var i in obj){//用javascript的for/in循环遍历对象的属性 
temp += i+":"+obj[i]+"\n"; 
} 
alert(temp);//结果：cid:C0 \n ctext:区县 
} 
```


----------

**怎么动态给key赋值，然后以obj.key的方式得到对应的value呢**


其实以上printObject中有提示，那就是用**obj[key]**的方法，key可以是动态的，这样就解决了我上面提出的问题了。 
最后说一下，还有一个方法也可以，那就是：**eval("obj."+key)**。

 **总结**
 
 
js中想根据动态key得到某对象中相对应的value的方法有两个

 1. var key = "name1";var value = obj[key]; 
 2. var key = "name1";var value = eval("obj."+key);

```javascript
var obj={"name":"tom","age":22,"job":"it"};
var keys="name";
console.log(obj[keys]);   //tom 
console.log(eval("obj."+keys));   //tom
```







### toUTCString和toGMTString区别




[网页链接](http://www.w3school.com.cn/jsref/jsref_toGMTString.asp)

 **定义和用法**
 
 
toGMTString() 方法可根据格林威治时间 (GMT) 把 Date 对象转换为字符串，并返回结果。


**语法**
dateObject.toGMTString()


**返回值**
dateObject 的字符串表示。此日期会在转换为字符串之前由本地时区转换为 GMT 时区。


**不赞成使用此方法。请使用 toUTCString() 取而代之！！**



**目前UTC已经取代GMT作为新的世界时间标准**


```javascript
console.log(new Date().toDateString()) //Tue Apr 17 2018
console.log(new Date().toGMTString()) //Tue, 17 Apr 2018 14:37:22 GMT
console.log(new Date().toUTCString())  //Tue, 17 Apr 2018 14:37:22 GMT
```





### target，currentTarget和this








[网页链接](https://blog.csdn.net/wkyseo/article/details/51863483)

**target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段**


只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象(注册该事件的对象)（一般为父级）。


**this指向永远和currentTarget指向一致（只考虑this的普通函数调用）**。

```html
 <div id="outer" style="background:#099">  
     click outer  
     <p id="inner" style="background:#9C0">click inner</p>  
     <br>  
 </div>  
```


```javascript
    <script type="text/javascript">  
    function G(id){  
        return document.getElementById(id);      
    }  
    function addEvent(obj, ev, handler){  
        if(window.attachEvent){  
            obj.attachEvent("on" + ev, handler);  
        }else if(window.addEventListener){   
            obj.addEventListener(ev, handler, false);  
        }  
    }  
    function test(e){  
        alert("e.target.tagName : " + e.target.tagName + "\n e.currentTarget.tagName : " + e.currentTarget.tagName);  
    }  
    var outer = G("outer");  
    var inner = G("inner");  
    //addEvent(inner, "click", test);  
    addEvent(outer, "click", test);  
    </script>
 ```
 
 
 
 
当点击inner对象的时候，先触发inner绑定的事件，再触发outer绑定的事件，（因为outer是在事件冒泡阶段绑定的，如果outer是在捕获阶段绑定的，就会先触发out的事件程序，即便inner事件也绑定在捕获阶段。因为捕获流从根部元素开始）。 


**事件流：捕获（自顶而下）——目标阶段——冒泡（自下而顶）**

在事件处理程序内部，对象this始终等于currentTarget的值(换个角度理解，DOM上的方法this指向都为该DOM-方法调用模式)，而target则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则this、currentTarget和target包含相同的值。
 
 
 
 
 
 
 

 **补充**
 
 
HTML DOM addEventListener() 方法
 
第三个参数：useCapture	可选。布尔值，指定事件是否在捕获或冒泡阶段执行。

可能值:
* true - 事件句柄在捕获阶段执行
* false- false- 默认。事件句柄在冒泡阶段执行 
 
 
 
 




### 监听滚动条事件





在Jquery中:
$(window).scrollTop()
方法返回或设置匹配元素的滚动条的垂直位置。

也就是scroll top offset 指的是滚动条相对于其顶部的偏移。


如果该方法未设置参数，则返回以像素计的相对滚动条顶部的偏移。

// 返回值为纯数字 不带px



 **语法**
 
 
$(selector).scrollTop(offset)

| 参数   | 描述                                       |
| ------ | ------------------------------------------ |
| offset | 可选。规定相对滚动条顶部的偏移，以像素计。 |




>被所有浏览器支持.

 **小案例**
 
 
dom元素随着滚动条滚动而滚动

>也就是说相对窗体，这个dom元素不移动

```javascript
jQuery(document).ready(function ($) {
    var f = parseInt($(".spig").css("top"));
    $(window).scroll(function () {
        $(".spig").animate({
                top: $(window).scrollTop() + f
            },
            {
                queue: false,
                duration: 1000
            });
    });
});
```

监听window的滑动事件，当window滑动时，改变dom元素的位置































  [1]: https://pic3.zhimg.com/50/2e9a57f3043adfd954e147c8718c3266_hd.jpg









