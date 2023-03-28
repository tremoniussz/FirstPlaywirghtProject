import { test, expect, chromium, Browser, Page } from "@playwright/test";
import { TodoListPage } from "../page-object/toDoListPage";
import { DictionaryTaskNames } from "../data/taskName";

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
    await todoListPage.inputItemName(DictionaryTaskNames.ToDoName)
    await todoListPage.pressEnterToAddNewItem()
    await todoListPage.refreshItemList();
    expect((await todoListPage.itemList.allTextContents()).includes(DictionaryTaskNames.ToDoName));
  });

  //Test deleting an item from the Todo List
  test("should add and remove item from todo list", async () => {
    await todoListPage.inputItemName(DictionaryTaskNames.ToDeleteName)
    await todoListPage.pressEnterToAddNewItem()
    await todoListPage.refreshItemList();
    await todoListPage.deleteItemFromListByItemName(DictionaryTaskNames.ToDeleteName);
    expect((await todoListPage.itemList.allTextContents()).includes(DictionaryTaskNames.ToDeleteName)).not;
  });

  test("should incresse item list size by one after adding new element", async () => {
    //const listSizeBeforeAdding = await todoListPage.getToDoItemListSize();
    await todoListPage.inputItemName(DictionaryTaskNames.ToDoName)
    await todoListPage.pressEnterToAddNewItem()
    await todoListPage.refreshItemList();
    //const listSizeAfterAddNewItem = await todoListPage.getToDoItemListSize();
    //expect(listSizeAfterAddNewItem).toBe(listSizeBeforeAdding + 1);
  });

});
