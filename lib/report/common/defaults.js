module.exports = {
    watermarks: function () {
        return {
            statements: [ 50, 80 ],
            lines: [ 50, 80 ],
            functions: [ 50, 80],
            branches: [ 50, 80 ]
        };
    },

    classFor: function (type, metrics, watermarks) {
        var mark = watermarks[type],
            value = metrics[type].pct;
        return value >= mark[1] ? 'high' : value >= mark[0] ? 'medium' : 'low';
    },

    colorize: function (str, clazz) {
        /* istanbul ignore if: untestable in batch mode */
        if (process.stdout.isTTY) {
            switch (clazz) {
                case 'low' : str = '\033[91m' + str + '\033[0m'; break;
                case 'medium': str = '\033[93m' + str + '\033[0m'; break;
                case 'high': str = '\033[92m' + str + '\033[0m'; break;
            }
        }
        return str;
    }
};
