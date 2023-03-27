import { Page, Locator, test } from "@playwright/test";
import { keysDictionary } from "../data/key_data";

const urlTodoList = 'https://webdriveruniversity.com/To-Do-List/index.html'

export class TodoListPage {

  private page: Page;
  private addNewTodoInput: Locator;
  itemList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewTodoInput = page.locator('[placeholder="Add new todo"]');
    this.itemList = page.locator("li");
  }

  async navigate() {
    await this.page.goto(urlTodoList);
  }

  async inputItemName(newItemName: string) {
    await test.step(`Input new todo item on todo list with name: ${newItemName}`, async () => {
      await this.addNewTodoInput?.type(newItemName);
    })
  }

  async pressEnterToAddNewItem() {
    await test.step(`Press enter after provide task name`, async () => {
      await this.addNewTodoInput?.press(keysDictionary["ENTER"]);
    })
  }

  async refreshItemList() {
    await test.step(`Refresh item list`, async () => {
      this.itemList = this.page.locator("li");
    })
  }

  async deleteItemFromListByItemName(itemToDelete: string) {
    const listItem = this.page.locator('li').getByText(itemToDelete)
    await test.step(`Hover item do delete with name:${itemToDelete} `, async () => {
      await listItem.hover()
    })
    await test.step(`Press delete button for todo item wiht name :${itemToDelete} `, async () => {
      const deleteButton = listItem.locator('span');
      await deleteButton.click();
      await listItem.waitFor({ state: 'hidden' });
    })
  }

  async getToDoItemListSize() {
    await test.step(`Count size of todo list} `, async () => { })
    return this.itemList.count();
  }

}