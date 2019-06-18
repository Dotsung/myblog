import { observable, action } from 'mobx';
import * as postApi from 'lib/api/post';

class postListStore {
    @observable postList = [];
    @observable page = 1;

  constructor() {
      this.getList();
  }


  @action.bound
  getList = () => {
    postApi.list({page: this.page})
    .then((result) => {
      //console.log('list불러오기 성공');
      this.postList = result.data;
      console.log(this.postList)
      //console.log(this.state.data)
    })
    .catch((result) => {
      console.log('list store err');
      console.log(result);
    });
  }

  @action.bound
  loadMore = () => {
    this.page = this.page + 1;
    postApi.list({page: this.page})
    .then((result) => {
        //console.log('list불러오기 성공');
        this.postList = this.postList.concat(result.data);
        //console.log(this.state.data)
    })
    .catch((result) => {
        console.log('list store err');
        console.log(result);
    });
  }

  @action.bound
  heart = ({ index }) => {
      this.postList[index].hearted = true;
  }

  @action.bound
  inheart = ({ index }) => {
      this.postList[index].hearts += 1;
  }

  @action.bound
  unheart = ({ index }) => {
      this.postList[index].hearted = false;
  }

  @action.bound
  deheart = ({ index }) => {
      this.postList[index].hearts -= 1;
  }

  @action.bound
  star = ({ index }) => {
      this.postList[index].stared = true;
  }

  @action.bound
  instar = ({ index }) => {
      this.postList[index].stars += 1;
  }

  @action.bound
  unstar = ({ index }) => {
      this.postList[index].stared = false;
  }

  @action.bound
  destar = ({ index }) => {
      this.postList[index].stars -= 1;
  }
  
}

export default postListStore