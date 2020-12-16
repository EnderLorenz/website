class LinkedList {
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

    add = function(data) {
        var node = new Node(data);
        if (this.head === null) {
            this.head = node;
        } else {
            var currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next; 
            }
            currentNode.next = node;
        }
        this.size++;
    };

    remove = function(data) {
        var currentNode = this.head;
        var previousNode = null;

        while (currentNode != null) {
            if (currentNode.data === data) {
                if(previousNode === null) this.head = current.next;
                else {
                    previousNode.next = currentNode.next;
                }
                currentNode = null;
                this.size--;
                return 1;
            }
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        return -1;
    };

    insertAt = function(index, data) {
        if (index > 0 && index > this.size) return false;
        else {
            var node = new Node(data);
            var currentNode, previousNode;
            currentNode = this.head;
            if (index == 0){
                node.next = this.head;
                this.head = node;
            } else {
                currentNode = this.head;
                var i = 0;
                while (i < index) {
                    i++;
                    previousNode = currentNode;
                    currentNode = currentNode.next;
                }
                node.next = currentNode;
                previousNode.next = node;
            }
            this.size++;
        }
    };

    removeFrom = function(index) {
        if (index > 0 && index > this.size) return -1;
        else {
            var currentNode, previousNode;
            var i = 0;
            currentNode = this.head;
            previousNode = currentNode;
            if (index == 0) {
                this.head = currentNode.next;
            } else {
                while (i < index) {
                    i++;
                    previousNode = currentNode;
                    currentNode = currentNode.next
                }
                previousNode.next = currentNode.next;
                currentNode = null;
            }
            this.size--;
            return 1;
        }
    }

    indexOf = function(data) {
        var count = 0;
        var currentNode = this.head;
        while (currentNode != null) {
            if (currentNode.data === data) return count;
            count++;
            currentNode = currentNode.next;
        }
        return -1;
    };

    isEmpty = function() {
        return this.size == 0;
    };

    printList = function() {
        var currentNode = this.head;
        var str = "";
        while (currentNode) {
            str += currentNode.data + " ";
            currentNode = currentNode.next;
        }
        console.log(str);
    }

}