import { Component, OnInit, Input } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.css']
})
export class WordDialogComponent implements OnInit {

	@Input() word: Object;
  constructor(public dialogRef: MdDialogRef<WordDialogComponent>) { }

  ngOnInit() {
  }

}
