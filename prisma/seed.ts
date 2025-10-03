import prisma from "@/lib/prisma";

const main = async() => {
    try{
        await prisma.configuration.create({
            data: {
                type: 'Domain',
                value: {
                    name: 'tirbet.com'
                }
            }
        })
    }catch (error){
        console.error("Error seed migration", error);
        process.exit(1);
    }
}

main();