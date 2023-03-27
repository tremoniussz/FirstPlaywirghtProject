import {test, expect,  chromium, Browser, Page } from "@playwright/test";
import  { TodoListPage } from "../page_object/toDoListPage";
import {dictionaryTaskNames} from "../data/task_name";

// Define the test suite for the Todo List page
test.describe("Todo List", () => {
  let browser: Browser;
  let page: Page;
  let todoListPage: TodoListPage;
  

  // Launch the browser and create a new page before running the test suite
  test.beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    todoListPage = new TodoListPage(page);
  });

  // Close the browser after running the test suite
  test.afterAll(async () => {
    await browser.close();
  });

  // Navigate to the Todo List page before each test
  test.beforeEach(async () => {
    await todoListPage.navigate();

  });

//  Test adding a new item to the Todo List
  test("should add a new item to todo list", async () => {
    await todoListPage.inputItemName(dictionaryTaskNames["toAddTaskName"])
    await todoListPage.pressEnterToAddNewItem()
    await todoListPage.refreshItemList();
    expect((await todoListPage.itemList.allTextContents()).includes(dictionaryTaskNames["toAddTaskName"]));
  });

  //Test deleting an item from the Todo List
  test("should add and remove item from todo list", async () => {
    await todoListPage.inputItemName(dictionaryTaskNames["toDeleteTaskName"])
    await todoListPage.pressEnterToAddNewItem()
    await todoListPage.refreshItemList();
    await todoListPage.deleteItemFromListByItemName(dictionaryTaskNames["toDeleteTaskName"]);
    expect((await todoListPage.itemList.allTextContents()).includes(dictionaryTaskNames["toAddTaskName"])).not;
  });
 
  test("should incresse item list size  by one after adding new element", async () => {
    const listSizeBeforeAdding =  await todoListPage.getToDoItemListSize();
    await todoListPage.inputItemName(dictionaryTaskNames["toAddTaskName"])
    await todoListPage.pressEnterToAddNewItem()
    await todoListPage.refreshItemList();
    const listSizeAfterAddNewItem = await todoListPage.getToDoItemListSize();
    expect(listSizeAfterAddNewItem).toBe(listSizeBeforeAdding + 1);
  });

});
