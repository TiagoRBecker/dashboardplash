interface ButtonProps {
  text: string;
  type?: "submit" | "reset" | "button";
}
const Button:React.FC<ButtonProps> = ({text,type = "button" }) => {
    return ( <button type={type} className="bg-[#302F4D] px-10 py-2 text-white rounded-md  h-full flex items-center justify-center">{text}</button> );
}
 
export default Button;