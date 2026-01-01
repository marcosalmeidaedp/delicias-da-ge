export default function Header() {
  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-semibold">Delícias da Gê</h1>

        <nav className="flex gap-6 text-sm">
          <a href="/" className="hover:text-gray-600">Início</a>
          <a href="/cardapio" className="hover:text-gray-600">Cardápio</a>
          <a href="#" className="hover:text-gray-600">Contato</a>
        </nav>
      </div>
    </header>
  );
}
