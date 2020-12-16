class Queue {

    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    getSize = function() {
        return this.size;
    }

    getHead = function() {
        return this.head;
    }

    getTail = function() {
        return this.tail;
    }

    enqueue = function(data) {
        var node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    }

    dequeue = function() {
        var node = null;
        if (this.head !== null) {
            node = this.head.next;
            node = this.head;
            this.head = this.head.next;
            this.size--;
        }
        return node.data
    }

    peek = function() {
        return this.head.data;
    }

    isEmpty = function() {
        return this.size == 0;
    }

    printQueue = function() {
        var currentNode = this.head;
        var str = "";
        while (currentNode) {
            str += currentNode.data.index + " ";
            currentNode = currentNode.next;
        }
        console.log(str);
    }

}