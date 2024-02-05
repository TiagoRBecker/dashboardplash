
import Link from "next/link";

const nav = () => {
    return ( 
    <header className="w-full h-28 bg-[#120D31] flex gap-3 items-center">
        <div className="flex items-center justify-center w-[30%] text-white text-4xl">
            Logo
        </div>
      <nav className="container flex items-center justify-center  uppercase">
        
        <ul className="flex gap-4 text-white">
          <Link href={"/"}>
          <li>Pagina Inicial</li>
          </Link>
          <Link href={"/categories"}>
          <li>Categorias</li>
          </Link>
          <Link href={"/houses"}>
          <li>Imovéis</li>
          </Link>
          <Link href={"/contato"}>
          <li>Contato</li>
          </Link>
            
            
        </ul>
      </nav>
    </header> );
}
 
export default nav;