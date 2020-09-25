function Stack() {
    this.size = 0;
    this.head = null;

    this.getSize = function() {
        return this.size;
    };

    this.getHead = function() {
        return this.head;
    };

    this.push = function(data) {
        var node = new Node(data);
        node.next = this.head;
        this.head = node;
        this.size++;
    };

    this.pop = function() {
        if (this.head !== null) {
            var tmp = this.head.data;
            this.head = this.head.next;
            this.size--;
            return tmp;
        }
        return null
    };

    this.peek = function() {
        return this.head.data;
    };

    this.isEmpty = function() {
        return this.size == 0;
    };

    this.printStack = function() {
        var currentNode = this.head;
        var str = "";
        while (currentNode) {
            str += currentNode.data + " ";
            currentNode = currentNode.next;
        }
        console.log(str);
    }

}