
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-view-files',
  templateUrl: './view-files.component.html',
  styleUrls: ['./view-files.component.css']
})
export class ViewFilesComponent implements OnInit {
  roomId!: number;
  files: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private chatservice: ChatService) { }

  ngOnInit(): void {
    this.roomId = +this.route.snapshot.paramMap.get('roomId')!;
    this.loadFiles();
  }

  loadFiles(): void {
    this.chatservice.getFilesForRoom(this.roomId.toString()).subscribe({
      next: (data) => {
        this.files = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error || 'Failed to load files.';
        this.loading = false;
      }
    });
  }

  downloadFile(filePath: string): void {
    window.open(`http://localhost:3000${filePath}`, '_blank');
  }
}
