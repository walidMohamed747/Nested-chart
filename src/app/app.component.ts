import { HttpService } from './services/http.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Hierarchy, Users } from './models/users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  hierarchy: Hierarchy[] = [];
  tree: Hierarchy[] = [];
  finshdHierarchy: Hierarchy[] = [];
  users: Users[] = [];
  selectedNode: TreeNode = {};
  constructor(private service: HttpService , private ref: ChangeDetectorRef) {}

  ngOnInit() {
    this.service.GetUsers().subscribe(
      (res: Array<Users>) => {
        this.hierarchy = res.map((ele) => {
          var arr = ele.code.split('.');
          return {
            name: ele.name,
            id: arr[arr.length - 1],
            parentId: arr[arr.length - 2],
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { avatar: '../assets/images/Walid.jpg' },
            children: [],
          };
        });
        var that = this;
        function buildTree(array: Array<Hierarchy>) {
          array.forEach((element) => {
            if (element.parentId) {
              let parent = array.filter((elem: any) => elem.id === element.parentId).pop();
              parent?.children.push(element);
            } else {
              that.tree.push(element);
            }
          });
          return that.tree;
        }
        // new Instance
        this.finshdHierarchy = buildTree(this.hierarchy);
        console.log('fh :>> ', this.finshdHierarchy);
      },
      (err) => {
        console.log('err :>> ', err);
      }
      );
      }
      }
  // buildTree(array:any) {
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i].parentId) {
  //       let parent = array.filter((elem:any) => elem.id === array[i].parentId).pop()
  //       parent.children.push(array[i])
  //     } else {
  //       this.tree.push(array[i])
  //     }
  //   }
  //   return this.tree
  // }

  // trackByMethod(index: number, el: any) {
  //   return setTimeout(() => el, 2000);
  // }
        //  let test = buildTree(this.hierarchy);
        // console.log('this.newArr :>> ', this.newArr);
        // this.newArr = new Array()
        // setInterval(()=>{
        //   test.forEach((ele) => {
        //     test = ele.children
        //     ele.children = []
        //     this.newArr.push(ele)
        //     console.log('this.newArr :>> ', this.newArr);
        //     this.ref.detectChanges()
        //   })
        // },1000)
        // childArr :any[]= []
        // newArr! :Array<Hierarchy>
        
        // (async () => {
        //     for (let index = 0; index < test.length; index++) {
        //     await new Promise((r) => {
        //       if (ele.parentId) {
        //         let parent = test.filter((elem) => elem.id === ele.parentId).pop();
        //         parent?.children.push(ele);
        //       } else {
        //         this.tree.push(ele);
        //       }
        //       setTimeout(() => {
        //         console.log('xxxxxxxxxxxxxxxxxxx :>> ');
        //         r('')
        //       }, 1000);
        //     });
        //     this.finshdHierarchy = this.hierarchy
        //   }
        // })();
        // console.log('this.fi :>> ', this.finshdHierarchy);
        // for (let i = 0; i < this.hierarchy.length; i++) {
        //     let parent = this.hierarchy.filter(elem => elem.id === this.hierarchy[i].parentId).pop()
        //     parent?.children.push(this.hierarchy[i])
        // }

        // this.users.forEach((ele, index) => {
        //   var idList = ele.code.split('.');
        //   ele['id'] = idList[idList.length - 1];
        //   ele['parent'] = idList[idList.length - 2] || 'parent';
        // });
        // // For Parent
        // this.users.find((ele) => {
        //   if (ele.parent === 'parent') {
        //     this.hierarchy2.push({
        //       name: ele.name,
        //       id: ele.id,
        //       type: 'person',
        //       styleClass: 'p-person',
        //       expanded: true,
        //       data: { avatar: ' ../assets/images/Walid.jpg' },
        //       children: [],
        //     });
        //     this.ref.detectChanges();
        //   }
        // });

        // // For high childs
        // this.users.forEach((ele, index) => {
        //   if (this.hierarchy2[0].id === ele.parent) {
        //     this.hierarchy2[0].children.push({
        //       name: ele.name,
        //       id: ele.id,
        //       type: 'person',
        //       styleClass: 'p-person',
        //       expanded: true,
        //       data: { avatar: '../../assets/images/Walid.jpg' },
        //       children: [],
        //     });
        //     this.ref.detectChanges();
        //   }
        // });

        // this.users.forEach((ele, index) => {
        //   this.hierarchy2[0].children.forEach((element: any) => {
        //     if (element.id === ele.parent) {
        //       console.log(element.id, ele.parent, element.id === ele.parent);
        //       element.children.push({
        //         name: ele.name,
        //         id: ele.id,
        //         type: 'person',
        //         styleClass: 'p-person',
        //         expanded: true,
        //         data: { avatar: '../../assets/images/Walid.jpg' },
        //         children: [],
        //       });
        //     }
        //   });
        // });

        // this.hierarchy = this.hierarchy2;
        // console.log('hierarchy :>> ', this.hierarchy);
