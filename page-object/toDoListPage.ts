import { Page, Locator, test } from "@playwright/test";
import { KeysDictionary } from "../data/keyData"
import { DictionaryTaskNames } from "../data/taskName"

export class TodoListPage {

  private readonly urlTodoList = 'https://webdriveruniversity.com/To-Do-List/index.html';
  private page: Page;
  private addNewTodoInput: Locator;
  itemList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewTodoInput = page.locator('[placeholder="Add new todo"]');
    this.itemList = page.locator("li");
  }

  async navigate() {
    await this.page.goto(this.urlTodoList);
  }

  async inputItemName(newItemName: DictionaryTaskNames) {
    await test.step(`Input new todo item on todo list with name: ${newItemName.toString()}`, async () => {
      await this.addNewTodoInput?.type(newItemName.toString());
    })
  }

  async pressEnterToAddNewItem() {
    await test.step(`Press enter after provide task name`, async () => {
      await this.addNewTodoInput?.press(KeysDictionary.ENTER.toString());
    })
  }

  async refreshItemList() {
    await test.step(`Refresh item list`, async () => {
      this.itemList = this.page.locator("li");
    })
  }

  async deleteItemFromListByItemName(itemToDelete: DictionaryTaskNames) {
    const listItem = this.page.locator('li').getByText(itemToDelete.toString())
    await test.step(`Hover item do delete with name:${itemToDelete.toString()} `, async () => {
      await listItem.hover()
    })
    await test.step(`Press delete button for todo item wiht name :${itemToDelete.toString()} `, async () => {
      const deleteButton = listItem.locator('span');
      await deleteButton.click();
      await listItem.waitFor({ state: 'hidden' });
    })
  }

  async getToDoItemListSize() {
    //added empty test step, could not add return in test.step def
    await test.step(`Count size of todo list} `, async () => { })
    return await this.itemList.count();
  }
}
