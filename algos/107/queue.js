function Queue() {
    this.size = 0;
    this.head = null;
    this.tail = null;

    this.getSize = function() {
        return this.size;
    };

    this.getHead = function() {
        return this.head;
    };

    this.getTail = function() {
        return this.tail;
    };

    this.enqueue = function(data) {
        var node = new Node(data);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.size++;
    };

    this.dequeue = function() {
        var node = null;
        if (this.head !== null) {
            node = this.head.next;
            node = this.head;
            this.head = this.head.next;
            this.size--;
        }
        return node.data
    };

    this.peek = function() {
        return this.head.data;
    };

    this.isEmpty = function() {
        return this.size == 0;
    };

    this.printQueue = function() {
        var currentNode = this.head;
        var str = "";
        while (currentNode) {
            str += currentNode.data.index + " ";
            currentNode = currentNode.next;
        }
        console.log(str);
    }

}