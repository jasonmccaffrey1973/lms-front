import styled from "styled-components"
import Header from "../sharedComponents/header/Header"
import Footer from "../sharedComponents/footer/Footer"
import Navigation from "../sharedComponents/navigation/components/Navigation"


const PageTemplate = ({ children }: { children: React.ReactNode }) => {
    return (
        <StyledPageTemplate>
            <Header />
            <section className="middle">
                <aside className="sidebar">
                    <Navigation />
                </aside>
                <main>
                    {children}
                </main>
            </section>
            <Footer>
                <div className="footer-content">
                    <div className="footer-logo">
                        Logo
                    </div>
                    <div className="footer-link-column">
                        links 1
                    </div>
                    <div className="footer-link-column">
                        links 2
                    </div>
                </div>
            </Footer>
        </StyledPageTemplate>
    )
}

export default PageTemplate



const StyledPageTemplate = styled.div`
    display: grid;
    grid-template-rows: auto 1fr auto;
    grid-template-areas: 'template-header'
                         'template-main'
                         'template-footer';
    min-block-size: 100dvh;

    /* HEADER */
    &:first-child {
        grid-area: template-header;
    }

    /* MAIN */
    .middle {
        grid-area: template-main;
        display: grid;
        grid-template-columns: auto  1fr;
        
        .sidebar {
            a {
                padding-inline: 1rem;
            }
        }

        main {
            box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }
    }



    /* FOOTER */
    &:last-child {
        grid-area: template-footer;
        .footer-content 
        {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            inline-size: min(80rem, 100% - 2rem);
            margin-inline: auto;

            

        }

    }
`