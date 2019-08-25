class FilterChain{
                constructor(){
                    this.filters = [];
                    this.currentIndex = 0;
                }

                addFilter(filter){
                    this.filters.push(filter);
                    return this;
                }

                doFilter(to,from,next,chain){
                    if(this.currentIndex == this.filters.length){
                        this.currentIndex = 0;
                        return
                    }
                    var filter = this.filters[this.currentIndex++];
                    filter.doFilter(to,from,next,chain);
                }
            }

            class Filter{
                doFilter(to,from,next,chain){

                }
            }

            class HtmlFilter extends Filter{
                doFilter(to,from,next,chain){
                    to = to.replace('<','&lt;').replace('>','&gt;')
                    console.log('to',to);
                    // if(to.indexOf('aa') > -1){
                        chain.doFilter(to,from,next,chain);
                        console.log('from','HtmlFilter------');
                    // }
                }
            }

            class SensitiveFilter extends Filter{
                doFilter(to,from,next,chain){
                    to = to.replace('敏感','**');
                    console.log('to',to);
                    chain.doFilter(to,from,next,chain);
                    console.log('from','SensitiveFilter------');
                }
            }

            var fc = new FilterChain();

            fc.addFilter(new HtmlFilter()).addFilter(new SensitiveFilter());
            fc.doFilter('this is <script> 敏感 :) ^V^ asdf','from',function(){},fc);
            // fc.doFilter('this is <script> 敏感 :) ^V^ asdf','from',function(){},fc);
