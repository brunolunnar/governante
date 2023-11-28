// Pasta: components/AppContainer.js
import React, { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import api from "../../services/api";
import { useRouter } from "next/router";

const AppContainer = ({ props, children }) => {
    const router = useRouter();
    const [session, setSession] = useState(props?.session ?? null); // Pega as informações da session do usuário, que eu recebo de props
    const paginasLiberadas = ["/", "/rota-exemplo"] // Páginas não precisam de autenticação com o nosso banco de dados/google ("/" libera a página de login, necessário!)
    // "Valido" verifica se rota é automaticamente liberada, se não for, retorna falso e verifica validação do usuário
    const [necessitaLogin, setNecessitaLogin] = useState(!(paginasLiberadas.includes(router.asPath.replace("/", "").includes("/") ? "/" + router.asPath.replace("/", "").split("/")[0] : router.asPath)))
    const [valido, setValido] = useState(!necessitaLogin);
    const [paginaCarregada, setPaginaCarregada] = useState(false); // Define se os dados do usuário já foram buscados

    async function validarUsuario() {
        try {
            let userEmail = session?.user?.email ?? ""
            // userEmail = "bruno@lunnar.team" // -> Pode trocar valor pra testar permissão de outros usuários, não esqueça de comentar em produção!
            const apiResponse = await api.post("/api/conectarDb", {
                email: userEmail,
                retonarDados: true,
            });
            const response = apiResponse?.data?.tenantValido ?? false
            if (response) setValido(true)
            if (!response) await signOut({ redirect: true, callbackUrl: 'https://www.youtube.com/' });
        } catch (error) {
            console.error("validarUsuario()-> Erro ao processar a requisição para a API:", error?.message ?? error);
        } finally {
            setPaginaCarregada(true)
        }
    }
    useEffect(() => {
        if (!paginaCarregada && necessitaLogin) {
            validarUsuario()
        }
    }, [])
    if (valido) {
        return children;
    } else {
        return <>Carregando...</>;
    }
};

export default AppContainer;