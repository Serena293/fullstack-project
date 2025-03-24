const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return(
        <footer style={{ textAlign: "center", padding: "1rem", background: "#f1f1f1" }}>
            &copy; {currentYear} - Plan App
        </footer>
    );
}

export default Footer;
