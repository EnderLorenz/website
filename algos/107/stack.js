class Stack { 
    constructor() {
        this.size = 0;
        this.head = null;
    }
    

    getSize = function() {
        return this.size;
    };

    getHead = function() {
        return this.head;
    };

    push = function(data) {
        var node = new Node(data);
        node.next = this.head;
        this.head = node;
        this.size++;
    };

    pop = function() {
        if (this.head !== null) {
            var tmp = this.head.data;
            this.head = this.head.next;
            this.size--;
            return tmp;
        }
        return null
    };

    peek = function() {
        return this.head.data;
    };

    isEmpty = function() {
        return this.size == 0;
    };

    printStack = function() {
        var currentNode = this.head;
        var str = "";
        while (currentNode) {
            str += currentNode.data + " ";
            currentNode = currentNode.next;
        }
        console.log(str);
    }

}