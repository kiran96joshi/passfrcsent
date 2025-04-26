import Link from 'next/link';

export default function Home() {
  return (
    <section className="text-center py-24 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <h1 className="text-4xl font-semibold mb-4">PassFRCSENT</h1>
      <p className="mb-8 text-lg">
        Smart revision questions, timed mocks and analytics for the FRCS&nbsp;(ORL-HNS).
      </p>
      <Link
        href="/practice"
        className="bg-white text-blue-700 px-6 py-3 rounded shadow hover:scale-105 transition"
      >
        Try a Demo Block
      </Link>
    </section>
  );
}
