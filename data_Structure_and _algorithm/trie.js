class Trie {
    constructor(){
        this.root = new Node();
    }

    add(word){
        var cur = this.root;
        var len = word.length;
        for (let i = 0; i < len; i++) {
            var c = word.charAt(i);
            if(cur.next.get(c) == null){
                cur.next.set(c,new Node());
            }
            cur = cur.next.get(c);
        }
        if(!cur.isWord){
            cur.isWord = true;
        }
    }

    contains(word){
        var cur = this.root;
        var len = word.length;
        for (let i = 0; i < len; i++) {
            var c = word.charAt(i);
            if(cur.next.get(c) == null){
                return false;
            }
            cur = cur.next.get(c);
        }
       return cur.isWord;
    }

}

class Node{
    constructor(isWord = false){
        this.isWord = isWord;
        this.next = new Map();
    }
}

var trie = new Trie();

trie.add('pan');
trie.add('panda');
trie.add('dog');
trie.add('deer');
trie.add('dear');

console.log(trie.contains('add'))
console.log(trie.contains('pan'))