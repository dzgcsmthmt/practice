<template>
    <div class="drag-wrapper" ref="ele" :class="className">
        <div class="drag-move-wrapper" ref="moveEle"></div>
        <slot />
    </div>
</template>
<script>
    export default {
        name: "DragComponent",
        props: {
            direction: String,
            className: String,
        },
        mounted() {
            let direction = this.direction;
            let self = this;
            if (
                ["horizontal", "vertical", "both"].indexOf(this.direction) ===
                -1
            ) {
                direction = "vertical";
            }
            let moveEle = this.$refs.moveEle;
            let wrapperEle = moveEle.parentElement;
            let parentEle = wrapperEle.parentElement;
            let offsetW, offsetH;
            if (direction === "horizontal" || direction === "both") {
                offsetW = parentEle.offsetWidth;
            }
            if (direction === "vertical" || direction === "both") {
                offsetH = parentEle.offsetHeight;
            }

            let moveEleH,
                moveEleW,
                originPageX,
                originPageY,
                originBottom,
                originLeft;
            function mousedown(ev) {
                if (direction === "horizontal" || direction === "both") {
                    moveEleW = wrapperEle.offsetWidth;
                    originPageX = ev.pageX;
                    originLeft = parseInt(getComputedStyle(wrapperEle).left);
                }
                if (direction === "vertical" || direction === "both") {
                    moveEleH = wrapperEle.offsetHeight;
                    originPageY = ev.pageY;
                    originBottom = parseInt(
                        getComputedStyle(wrapperEle).bottom
                    );
                }
                parentEle.style = "cursor:move;user-select: none";
                document.addEventListener("mousemove", mousemove);
                document.addEventListener("mouseup", mouseup);
                function mousemove(ev) {
                    if (direction === "horizontal" || direction === "both") {
                        let offsetX = ev.pageX - originPageX;
                        let left = originLeft + offsetX;
                        if (left < 0) {
                            left = 0;
                        }
                        if (left + moveEleW > offsetW) {
                            left = offsetW - moveEleW;
                        }
                        self.$refs.ele.style.cssText = `left:${left}px;right:auto`;
                    }
                    //选择bottom是因为拖动元素可能高度会有变化
                    if (direction === "vertical" || direction === "both") {
                        let offsetY = ev.pageY - originPageY;
                        let bottom = originBottom - offsetY;
                        if (bottom < 0) {
                            bottom = 0;
                        }
                        if (moveEleH + bottom > offsetH) {
                            bottom = offsetH - moveEleH;
                        }
                        self.$refs.ele.style.cssText += `top:auto;bottom:${bottom}px`;
                    }
                }

                function mouseup() {
                    parentEle.style = "";
                    document.removeEventListener("mousemove", mousemove);
                    document.removeEventListener("mouseup", mouseup);
                }
            }
            moveEle.addEventListener("mousedown", mousedown);
        },
    };
</script>
<style lang="less" scoped>
    .drag-wrapper {
        width: 48px;
        padding: 0 8px;
        border-radius: 4px;
        background: #ffffff;
        border: 1px solid #ebeef5;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
        position: absolute;
    }
    .drag-move-wrapper {
        height: 20px;
        cursor: move;
        background: #66b1ff;
        margin: 0 -10px;
        border-radius: 4px 4px 0 0;
    }
</style>
