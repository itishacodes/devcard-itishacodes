#!/usr/bin/env node

import process from 'node:process';
import os from 'node:os';
import boxen from 'boxen';
import chalk from 'chalk';
import qrcode from 'qrcode-terminal';
import search from '@inquirer/search';
import input from '@inquirer/input';
import open from 'open';
import ora from 'ora';

// 1. Data Structure with Clean Responsive Banner
const getResponsiveName = () => {
    const cols = process.stdout.columns || 80;
    if (cols < 65) {
        return chalk.bold.green ("              ITISHA");
    }
    return chalk.bold.green (`  ███████╗ ████████╗ ██╗ ███████╗ ██╗  ██╗  █████╗ 
  ╚══██╔═╝ ╚══██╔══╝ ██║ ██╔════╝ ██║  ██║ ██╔══██╗
     ██║      ██║    ██║ ███████╗ ███████║ ███████║
     ██║      ██║    ██║ ╚════██║ ██╔══██║ ██╔══██║
  ███████╗    ██║    ██║ ███████║ ██║  ██║ ██║  ██║
  ╚══════╝    ╚═╝    ╚═╝ ╚══════╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝`);
};


const data = {
    name: getResponsiveName(),
    role: chalk.cyan("Full Stack Developer & Software Engineer"),
    github: chalk.green("@itishacodes"),
    portfolio: chalk.green("itisha-maheshwari.netlify.app"), 
    quote: chalk.gray('"Architecting seamless interfaces and robust backend systems."')
};

// 2. Setup System Info
const platformNames: Record<string, string> = {
    win32: 'Windows',
    darwin: 'macOS',
    linux: 'Linux'
};
const platform = platformNames[os.platform()] || os.platform();
const systemInfo = `Platform : ${platform} ${os.release()}
Node     : ${process.version}
Terminal : ${process.env.TERM || 'Unknown'}`;


// 3. Setup Layout Text
const output = `
${data.name}

${chalk.bold("Role:")}      ${data.role}
${chalk.bold("GitHub:")}    ${data.github}
${chalk.bold("Portfolio:")} ${data.portfolio}

${chalk.bold("Core Stack")}
• TypeScript            • Node.js
• React / Next.js       • Express
• MongoDB               • TailwindCSS
• Git & GitHub          • REST APIs

${systemInfo}

${data.quote}
`;

// 4. Main function
async function main() {
    console.clear();

    const spinner = ora('Initializing profile components...').start();
    await new Promise(resolve => setTimeout(resolve, 600));
    spinner.stop();
    console.clear();

    const card = boxen(output, {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: "yellow",
        title: "v1.1.0",
        titleAlignment: "right"
    });

    console.log(card);
    console.log(chalk.gray(`\nRunning on ${platform} environment...\n`));

    while (true) {
        const choices = [
            { name: '❯ Open Portfolio Website', value: 'portfolio', description: 'Opens itishacodes.dev' },
            { name: '  Explore GitHub Profile', value: 'github', description: 'Opens github.com/itishacodes' },
            { name: '  Connect on LinkedIn', value: 'linkedin', description: 'Let\'s network on LinkedIn!' },
            { name: '  Check Live GitHub Activity', value: 'activity', description: 'Fetches my most recent push live from GitHub API' },
            { name: '  Test Connection Latency', value: 'ping', description: 'Measures your connection speed to the portfolio host' },
            { name: '  Sign my CLI Guestbook', value: 'guestbook', description: 'Leave a quick text note on this terminal session' },
            { name: '  Generate Mobile QR Code', value: 'qrcode', description: 'Scan to load profile on mobile' },
            { name: '  Send an Email', value: 'email', description: 'Reach out for collaborations!' },
            { name: '  Surprise Me (Developer Wisdom)', value: 'easteregg', description: 'A database of deep engineering insights...' },
            { name: '  Exit CLI', value: 'quit', description: 'Safely terminate the terminal card session' },
        ];

        const answer = await search({
            message: 'Command Palette (Type to look up command or use arrows):',
            source: async (input, { signal }) => {
                if (!input) return choices;
                return choices.filter(choice => choice.name.toLowerCase().includes(input.toLowerCase()));
            }
        });

        if (answer === 'portfolio') {
            console.log(chalk.green('\nBrowser launched successfully.'));
            await open('https://itisha-maheshwari.netlify.app/');
            console.log(chalk.gray('Returning to prompt...\n'));
        } else if (answer === 'github') {
            console.log(chalk.green('\nBrowser launched successfully.'));
            await open('https://github.com/itishacodes');
            console.log(chalk.gray('Returning to prompt...\n'));
        } else if (answer === 'linkedin') {
            console.log(chalk.green('\nRedirecting to LinkedIn...'));
            await open('https://www.linkedin.com/in/itisha-maheshwari/'); 
            console.log(chalk.gray('Returning to prompt...\n'));
        } else if (answer === 'email') {
            console.log(chalk.green('\nInitializing local mail user agent...'));
            await open('mailto:work.itishaa@gmail.com'); 
            console.log(chalk.gray('Returning to prompt...\n'));
        } else if (answer === 'qrcode') {
            console.log(chalk.bold.magenta("\nScan this matrix code with your device:\n"));
            qrcode.generate("https://github.com/itishacodes", { small: true });
            console.log('\n');
        } else if (answer === 'ping') {
            const pingSpinner = ora('Measuring ping to network gateway...').start();
            const start = Date.now();
            try {
                await fetch('https://api.github.com');
                const latency = Date.now() - start;
                pingSpinner.succeed(chalk.green(` Connection stable! Latency: ${latency}ms`));
            } catch {
                pingSpinner.fail(chalk.red(' Network unreachable or client offline.'));
            }
            console.log('');
        } else if (answer === 'guestbook') {
            console.log('');
            const nameInput = await input({ message: 'Your Name:' });
            const msgInput = await input({ message: 'Your Message:' });
            console.log(chalk.bold.green(`\nThank you ${nameInput}! Message recorded: "${msgInput}"\n`));
        } else if (answer === 'activity') {
            const actSpinner = ora('Querying event stream...').start();
            try {
                const res = await fetch('https://api.github.com/users/itishacodes/events/public');
                const events = await res.json() as any[];
                actSpinner.stop();
                
                if (events && events.length > 0) {
                    const pushEvent = events.find(e => e.type === 'PushEvent');
                    if (pushEvent) {
                        const repoName = pushEvent.repo.name;
                        const count = pushEvent.payload.commits?.length || 1;
                        console.log(chalk.bold.cyan(`\nRecent Activity: Pushed ${count} commit(s) to repo \`${repoName}\`!\n`));
                    } else {
                        console.log(chalk.bold.cyan(`\nRecent Activity: Active on GitHub doing actions recently!\n`));
                    }
                } else {
                    console.log(chalk.yellow('\nNo public event streams found recently.\n'));
                }
            } catch {
                actSpinner.fail(chalk.red(' Could not connect to GitHub endpoint.'));
            }
        } else if (answer === 'easteregg') {
            const devQuotes = [
                "GITHUB_STATS",
                "Code is like humor. When you have to explain it, it's bad.",
                "First, solve the problem. Then, write the code.",
                "Optimizing code early is the root of all software engineering evil.",
                "Make it work, make it right, make it fast.",
                "It's not a bug, it's an undocumented feature.",
                "The best code is no code at all. Fewer lines means fewer bugs.",
                "Deleted code is debugged code.",
                "Programs must be written for people to read, and only incidentally for machines to execute.",             "If it's not in version control, it doesn't exist.",
                "A deploy without a tested rollback is a gamble.",
                "There is no cloud, just someone else's computer.",
                "It works on my machine ¯\\_(ツ)_/¯",
                "Monitoring is not optional—it's insurance.",
                "Every outage teaches what docs can't.",
                "Logs are your conversation with the past.",
                "Automation is just scripting with accountability.",
                "Containers don’t remove complexity. They relocate it.",
                "The bug was free. The downtime wasn’t.",
                "A server without monitoring is a horror movie in slow motion.",
                "SSH into prod enough times and eventually prod SSHs into your soul.",
                "Backups are Schrödinger’s feature until restore is tested.",
                "Scale exposes architecture lies.",
                "If your infra diagram looks clean, it’s outdated.",
                "Every sudo rm -rf starts with confidence.",
                "YAML: where one space can destroy civilizations.",
                "Kubernetes is what happens when engineers fear simplicity.",
                "CI/CD without tests is just faster failure delivery.",
                "The database remembers every bad decision.",
                "Caching fixes performance and creates philosophy debates.",
                "A 99.9% uptime SLA still allows chaos. Humans love decimals.",
                "Temporary fixes have excellent survival rates.",
                "Your future self is the real DevOps customer.",
                "Permissions are easy until production says otherwise.",
                "Infra as Code means your mistakes are now reproducible.",
                "If alerts fire for everything, they matter for nothing.",
                "The best optimization is deleting unnecessary systems.",
                "Docker didn’t solve dependency hell. It containerized it.",
                "Every manual step becomes tomorrow’s incident report.",
                "Distributed systems are just computers refusing teamwork.",
                "You don’t own uptime. You rent it from reality.",
                "The more dashboards you have, the less anyone reads them.",
                "A restart is not a root cause analysis.",
                "Latency is just distance charging interest.",
                "An unpatched server is basically a public challenge.",
                "Real engineers fear silent failures more than loud crashes."
            ];
            const randomQuote = devQuotes[Math.floor(Math.random() * devQuotes.length)];

            if (randomQuote === "GITHUB_STATS") {
                try {
                    const res = await fetch('https://api.github.com/users/itishacodes');
                    const profileData = await res.json() as any;
                    console.log(chalk.bold.magenta(`\nToday's Live GitHub Performance\nPublic Repositories: ${profileData.public_repos}\nFollowers: ${profileData.followers}\n`));
                } catch (e) {
                    console.log(chalk.bold.red('\nGitHub server fetch timed out. Check your terminal connection.\n'));
                }
            } else {
                console.log(chalk.bold.magenta('\n' + randomQuote + '\n'));
            }
        } else {
            console.log(chalk.gray('\nMission complete. DevCard instance closed.'));
            console.log(chalk.bold.magenta('Thank you for checking out itishacodes! Bye.\n'));
            process.exit(0);
        }
    }
}

main().catch(console.error);