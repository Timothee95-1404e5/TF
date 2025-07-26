
export default function Mission() {
  return (
    <section className="py-20 px-6 bg-gray-900 text-center">
      <h2 className="text-3xl font-semibold mb-8">Notre Mission</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div><h3 className="text-xl mb-2">Renseignement</h3><p>Identifier les menaces avant qu’elles ne frappent.</p></div>
        <div><h3 className="text-xl mb-2">Cybersécurité</h3><p>Protéger la souveraineté numérique française.</p></div>
        <div><h3 className="text-xl mb-2">Opérations extérieures</h3><p>Agir sur le terrain pour défendre les intérêts nationaux.</p></div>
      </div>
    </section>
  );
}
