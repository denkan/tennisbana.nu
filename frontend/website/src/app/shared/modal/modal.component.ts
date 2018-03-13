import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  //selector: 'app-modal',
  template: '',
})
export class ModalComponent {
  componentRef: ComponentType<Component>;
  dialogRef: MatDialogRef<Component>;

  config: MatDialogConfig = {
    disableClose: false,
    hasBackdrop: true,
    backdropClass: '',
    width: '',
    height: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
    data: null
  };


  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private doc: any,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    dialog.afterOpen.subscribe(() => {
      if (!doc.body.classList.contains('no-scroll')) {
        doc.body.classList.add('no-scroll');
      }
    });

    this.route.data.subscribe(data => {
      this.componentRef = data.modalComponent;

      this.mergeDialogOptions(data.dialogOptions || {});
      
      // pass route data
      this.config.data = this.config.data || {};
      this.config.data.modalRoute = this.route;

      this.openModal();
    })
  }

  openModal() {
    this.dialogRef = this.dialog.open(this.componentRef, this.config);

    this.dialogRef.beforeClose().subscribe((result: string) => {
      this.dialogRef = null;
      this.router.navigate([{ outlets: { o: null }}]);
      this.doc.body.classList.remove('no-scroll');
    });
  }


  private mergeDialogOptions(dialogOptions: any) {
    if(typeof dialogOptions === 'string') {
      // modal size: sm | md | lg
      // let panelClass = '';
      // switch(dialogOptions.toLowerCase()) {
      //   case 'sm': 
      //     panelClass = 'col-24 col-sm-16 col-md-10 col-lg-6'
      //     break;
      //   case 'md': 
      //     panelClass = 'col-24 col-sm-20 col-md-12 col-lg-8'
      //     break;
      //   case 'lg': 
      //     panelClass = 'col-24 col-sm-24 col-md-18 col-lg-12'
      //     break;        
      // }
      // dialogOptions = { panelClass };
      dialogOptions = { panelClass: dialogOptions };
    }
    
    return this.config = Object.assign(this.config, dialogOptions);
  }

}

