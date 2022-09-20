# Introduction
-{{myVariable}}-
- node版本12x


{% raw %}
  这 {{ 不会被处理 }}
{% endraw %}
这会从书本的变量中寻找 `myVariable` 并显示它。变量的名字可以存在点 (dot) 来查找属性。你同样可以使用方括号语法。
{{'aaa'}}

{{book.myTest}}
