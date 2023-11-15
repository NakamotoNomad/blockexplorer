function NotFoundPage() {
    console.log("Whoopsiedaisy, page not found.");
    return <div>
        <h2>404 - Page not found</h2>
        <img src="/notFound.png" alt="Page not found" width="512px" height="512px" />
    </div>;
}

export default NotFoundPage;