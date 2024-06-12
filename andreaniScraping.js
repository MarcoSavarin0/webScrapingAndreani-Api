import puppeteer from "puppeteer";

export async function enviosCosto(cpDestino, valor) {
    const browser = await puppeteer.launch(
        {args: ['--no-sandbox', '--disable-setuid-sandbox']});
    const page = await browser.newPage();

    try {
        await page.goto('https://pymes.andreani.com/cotizador');

        await page.waitForSelector('.MuiAutocomplete-root');

        await page.type('.MuiAutocomplete-root input', '3000');
        await page.waitForSelector('.MuiAutocomplete-option');
        const optionElement = await page.$('.MuiAutocomplete-option');
        await optionElement.click();

        await page.waitForSelector('.MuiAutocomplete-root[placeholder="Ej: 1824, Lanús Oeste"]');
        await page.type('.MuiAutocomplete-root input[value=""]', cpDestino);
        await page.waitForSelector('.MuiAutocomplete-option');
        const optionElement2 = await page.$('.MuiAutocomplete-option');
        await optionElement2.click();

        await page.click('input[name="size"]');
        await page.waitForSelector(".MuiButtonBase-root");
        await page.click("li.MuiButtonBase-root");
        await page.waitForSelector('#input_valorDeclarado');
        await page.type('#input_valorDeclarado', valor);

        const nextButtonSelector = 'button.MuiButtonBase-root.MuiButton-root.StyleSystem__Button_root__56f1cbb8.MuiButton-contained.StyleSystem__Button_contained__56f1cbb8.MuiButton-containedPrimary.MuiButton-sizeMedium.StyleSystem__Button_sizeMedium__56f1cbb8.MuiButton-containedSizeMedium.MuiButton-disableElevation.MuiButton-fullWidth.Footer_next__nWhdk.css-1uudow';

        const nextButton = await page.$(nextButtonSelector);

        if (nextButton) {
            const isButtonEnabled = await page.evaluate(element => !element.disabled, nextButton);
            if (isButtonEnabled) {
                await nextButton.hover();
                await page.evaluate(element => {
                    element.click();
                }, nextButton);
                const stepBodyVisible = await page.waitForSelector('.CardCotization_principalText__rz_dd');

                if (stepBodyVisible) {
                    const h5Texts = await page.evaluate(() => {
                        const h5Elements = document.querySelectorAll('.Stepper_stepbody__ToUe3 h5');
                        return Array.from(h5Elements).map(element => element.innerText);
                    });
                    await browser.close();
                    return h5Texts; 
                } else {
                    console.log("Next section did not load.");
                    await browser.close();
                }
            } else {
                console.log("Next button is disabled.");
                await browser.close();
            }
        } else {
            console.log("Next button not found.");
            await browser.close();
        }

    } catch (error) {
        await browser.close();
        throw error; 
    }
}

