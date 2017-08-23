i(document).on("input", "#comment", function() {
if (!m) {
    var t = i(this).val()
      , e = i.string.lenb(t)
      , n = i(this).data("max");
    e > n && (t = i.string.subByte(t, n),
    i(this).val(t)),
    i("#count_hint").html(i.string.lenb(t))
}
}),
i(document).on("compositionstart", "#comment", function() {
m = !0
}),
i(document).on("compositionend", "#comment", function() {
m = !1,
i("#comment").trigger("input")
})
针对中文输入法使用compositionstart方法
-----------------------------------------------------------------------------------------------------------------------
