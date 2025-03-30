import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AMSF';

  paymentReceiptUrl: string | null = null;

  previewImage(event: any, previewId: string): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.paymentReceiptUrl = reader.result as string; // Set the image URL to the variable
    };
    reader.readAsDataURL(event.target.files[0]);
  }
}
