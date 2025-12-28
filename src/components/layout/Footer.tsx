export default function Footer() {
    return (
        <footer className="bg-background pt-32 pb-12 border-t border-white/5 relative z-50">
            <div className="container mx-auto px-6">
                <div className="mb-24 text-center">
                    <p className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6">Start a Project</p>
                    <h2 className="text-5xl md:text-8xl lg:text-9xl font-serif text-white leading-none mb-12">
                        LET'S CREATE <br />
                        <span className="italic font-light text-white/50">Something Timeless</span>
                    </h2>
                    <a href="mailto:hello@agency.com" className="text-xl md:text-3xl text-white hover:text-primary transition-colors border-b border-white/20 pb-2 inline-block">
                        hello@agency.com
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 border-t border-white/10 pt-12 text-center">
                    <div>
                        <h4 className="text-white font-serif text-lg mb-4">Visit Us</h4>
                        <p className="text-muted text-sm leading-relaxed">
                            100 Smith Street<br />
                            Collingwood VIC 3066<br />
                            Australia
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-lg mb-4">Inquiries</h4>
                        <p className="text-muted text-sm leading-relaxed mb-2">
                            <a href="mailto:hello@agency.com" className="hover:text-primary transition-colors">hello@agency.com</a>
                        </p>
                        <p className="text-muted text-sm leading-relaxed">
                            <a href="tel:+61383766284" className="hover:text-primary transition-colors">+61 3 8376 6284</a>
                        </p>
                    </div>
                    <div>
                        <h4 className="text-white font-serif text-lg mb-4">Follow</h4>
                        <div className="flex flex-col space-y-2 text-muted text-sm uppercase tracking-wider items-center">
                            <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">Behance</a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-4 text-muted text-xs tracking-widest uppercase pt-12 border-t border-white/5 text-center">
                    <p>&copy; {new Date().getFullYear()} AGENCY. All rights reserved.</p>
                    <p> Designed by AALSIII </p>
                </div>
            </div>
        </footer>
    );
}
