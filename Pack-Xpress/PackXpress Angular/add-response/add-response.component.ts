import { Component, OnInit } from '@angular/core';
import { BranchOfficerserviceService } from '../services/branch-officerservice.service';
import { IComment } from '../Interfaces/Comment';
import { IBranchComments } from '../Interfaces/BranchComments';
import { IResponse } from '../Interfaces/Response';

@Component({
  selector: 'app-add-response',
  templateUrl: './add-response.component.html',
  styleUrls: ['./add-response.component.css']
})
export class AddResponseComponent implements OnInit {

  role: string;
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  officerLayout: boolean = false;
  userName: string;
  commListt: IResponse[];

  constructor(private _branchOfficerService: BranchOfficerserviceService) {
    this.userName = sessionStorage.getItem('userName');
    this.role = sessionStorage.getItem('userRole');
    if (this.role == 'Customer')
      this.customerLayout = true;
    else {
      if (this.role == 'Branch Officer')
        this.officerLayout = true;
      else
        this.commonLayout = true;
    }
  }

  ngOnInit() {
    this.getResponse();
  }

  getResponse() {
    this._branchOfficerService.getComments().subscribe(
      x => { this.commListt = x; },
      y => { console.log(y); alert("Some error occured in getting comments"); },
      () => { console.log("Completed");}
    );
  }

  SubmitResponse(comment: IBranchComments, response: string) {
    this._branchOfficerService.submitResponse(comment.applicationNo, comment.emailId, comment.commentType, comment.comment, response).subscribe(
      x => { if (x) alert("Respponse submitted successfully"); else alert("Response not submited") },
      y => { console.log(y); alert("Some error occured");},
      () => { console.log("Completed");}
    );
  }

}
