import { Component } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-html-to-pdf',
  templateUrl: './html-to-pdf.component.html',
  styleUrls: ['./html-to-pdf.component.scss'],
})
export class HtmlToPdfComponent {
  printToPDF() {
    const element = document.querySelector('#print') as HTMLElement;

    if (element.innerHTML === '') {
      console.log('The element is empty. PDF generation skipped.');
      return;
    }

    const pageSize = 'a4';
    const pageWidth = 210;
    const pageHeight = 297;

    const pdf = new jsPDF('p', 'mm', pageSize);
    pdf.internal.scaleFactor = 900;

    pdf.setFontSize(20);

    html2canvas(element, { scale: 5 }).then((canvas) => {
      const contentHeightPx = canvas.height/5 - 25;
      const contentHeightMm = pxToMm(contentHeightPx);
      const pageHeightWithoutMargin = pageHeight - 25;
      const totalPages = Math.ceil(contentHeightMm / pageHeightWithoutMargin);
      let currentPage = 1;
      let yOffsetMm = 0;

      while (currentPage <= totalPages) {
        pdf.addPage(pageSize);

        yOffsetMm = -(currentPage - 1) * pageHeightWithoutMargin;

        const imageData = canvas.toDataURL('image/png');

        pdf.addImage(
          imageData,
          'JPEG',
          10,
          yOffsetMm + 20,
          pageWidth - 20,
          0,
          'FAST'
        );
        pdf.setFillColor('#ffffff');
        pdf.rect(0, pageHeight - 20, pageWidth, 20, 'F');

        pdf.setLineWidth(0.5);
        pdf.setDrawColor('#aaaaaa');
        pdf.line(10, pageHeight - 20, pageWidth - 10, pageHeight - 20);

        pdf
          .setFontSize(10)
          .setTextColor('#aaaaaa')
          .text(` ${currentPage}`, pageWidth - 12, pageHeight - 15, {
            align: 'right',
          });
        currentPage++;
      }
      pdf.deletePage(1);
      pdf.save('print.pdf');
    });

    function pxToMm(px: number) {
      return (px * 25.4) / (96 * window.devicePixelRatio);
    }
  }
}
