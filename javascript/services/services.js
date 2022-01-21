const Service = {
    getProjects: async (file) => {
        try {
            const response = await fetch(file);
            return response.json();
        } catch (error) {
            throw new Error(`Error: ${error}`);
        }
    }
}