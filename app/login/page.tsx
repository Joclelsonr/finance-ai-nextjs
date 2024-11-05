import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="grid h-full grid-cols-2">
      {/* ESQUERDA */}
      <div className="mx-auto flex h-full max-w-[550px] flex-col justify-center p-8">
        <Image
          src="/logo.svg"
          alt="Finance AI"
          height={39}
          width={173}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="text-muted-foreground mb-8">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
      </div>
      {/* DIREITA */}
      <div className="relative h-full w-full">
        <Image
          src="/login.png"
          alt="Faça o Login"
          className="object-cover"
          fill
        />
      </div>
    </div>
  );
};

export default LoginPage;
