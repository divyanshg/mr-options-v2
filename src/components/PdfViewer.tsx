function PdfViewer({ report }: { report: string }) {
  return (
    <iframe
      height={1000}
      className="w-[360px] md:w-[840px] h-[1000px]"
      src={`https://mroptionsbucket.s3.ap-south-1.amazonaws.com/${report.toUpperCase()}.pdf#toolbar=0`}
    />
  );
}

export default PdfViewer;
