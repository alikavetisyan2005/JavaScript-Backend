function replacePlaceholders(template, variables) {
    let output = template;

    for (let key in variables) {
        const value = variables[key];
        const regex = new RegExp(`{{${key}}}`, 'g');
        output = output.replace(regex, value);
    }

    return output;
}

module.exports = replacePlaceholders;