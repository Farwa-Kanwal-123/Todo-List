#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";



let todoList : string[] = [];
let condition = true;

//print wellcome message
console.log(chalk.blue("\n\t<<=======================================================================>>\t\n"));
console.log(chalk.bgMagenta.italic.bold("\t\t <<=====>>  Wellcome To My TODO Application..!  <<=====>> \t\t"));
console.log(chalk.blue("\n\t<<=======================================================================>>\t\n"));
 


let main = async () => {
    while(condition){
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                choices: ["Add Task","Delete Task","Update Task","View Todo-List","Exit"],
                message: chalk.yellow("Select an option you want to do: ")
            }
        ]);
        if(option.choice === "Add Task"){
            await addTask();
        }
        else if(option.choice === "Delete Task"){
            await deleteTask();
        }
        else if(option.choice === "Update Task"){
            await updateTask();
        }
        else if(option.choice === "View Todo-List"){
            await viewTask();
        }
        else if(option.choice === "Exit"){
            condition = false
        }
    }
}
// function to add task in todo list
let addTask = async() => {
    let newTask = await inquirer.prompt([
        {
            name : "task",
            type: "input",
            message: "Enter your new task: "
        }
    ]);
    todoList.push(newTask.task);
    console.log(chalk.bgGrey(`\n Task ${chalk.bgCyanBright.bold(newTask.task)} is added successfully in Todo List.`));
    console.log(todoList);
}

//function to view all Todo-List Tasks
let viewTask = () => {
    console.log(chalk.bgGrey.bold("\n Your Todo-List: \n"));
    todoList.forEach((task,index)=>{
        console.log(chalk.greenBright(`${index + 1} : ${task}`));
    });
    console.log("\n");
    
}

//function to delete a task from the list
let deleteTask = async() => {
    await viewTask();
    let taskIndex = await inquirer.prompt([
        {
            name : "index",
            type : "number",
            message : "Enter the 'index no' of the task you want to delete :"
        }
    ]);
    let deletedTask = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.red(`\n Task ${chalk.bgMagenta(deletedTask)} has been deleted successfully from your todo-list.`));
    console.log(todoList);
}

//function to update a task
let updateTask = async() => {
    await viewTask()
    let update_task_index = await inquirer.prompt([
        {
            name : "index",
            type : "number",
            message : "Enter the 'index no' of the task you want to update : "
        },
        {
            name : "new_task",
            type : "input",
            message : "Now Enter new task name :",
        }
    ]);
    todoList[update_task_index .index -1] = update_task_index.new_task
    console.log(chalk.bgGrey(`\n Task at index no. ${chalk.bgMagentaBright.bold(update_task_index.index)} updated successfully.`));
    console.log(todoList);
    
}




main();