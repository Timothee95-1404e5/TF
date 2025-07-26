
export default function RecrutementForm() {
  return (
    <form className="bg-gray-900 p-6 rounded-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Formulaire de Recrutement</h2>
      <input type="text" placeholder="Nom" required className="mb-3 w-full p-2 rounded" />
      <input type="text" placeholder="Prénom" required className="mb-3 w-full p-2 rounded" />
      <input type="email" placeholder="Email" required className="mb-3 w-full p-2 rounded" />
      <textarea placeholder="Vos compétences" required className="mb-3 w-full p-2 rounded"></textarea>
      <input type="file" accept=".pdf,.docx" className="mb-3 w-full" />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700">
        Envoyer
      </button>
    </form>
  );
}
