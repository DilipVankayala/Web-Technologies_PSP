// To-Do List Manager
let todoList = [];
// Add a task
function addTask(task) {
    todoList.push({ name: task, completed: false });
    console.log(`✅ Task added: "${task}"`);
}
// List all tasks
function listTasks() {
    if (todoList.length === 0) {
        console.log("📂 No tasks found.");
    } else {
        console.log("\n📋 Your To-Do List:");
        todoList.forEach((task, index) => {
            let status = task.completed ? "✅ Done" : "❌ Not done";
            console.log(`${index + 1}. ${task.name} - ${status}`);
        });
    }
}
// Mark task as complete
function completeTask(index) {
    if (index > 0 && index <= todoList.length) {
        todoList[index - 1].completed = true;
        console.log(`🎯 Task "${todoList[index - 1].name}" marked as complete.`);
    } else {
        console.log("⚠️ Invalid task number.");
    }
}
// Example usage:
addTask("Buy groceries");
addTask("Complete JavaScript homework");
listTasks();
completeTask(1);
listTasks();