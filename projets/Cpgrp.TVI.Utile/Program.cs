using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace ConsoleApplicationRainettes
{
    class Program
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        static void Main(string[] args)
        {
            string action = "";
            string fileFiles = "";
            string fileFindReplace = "";
            bool write = false;
            bool backup = false;
            int index = 0;
            while (index < args.Length)
            {
                string arg = args[index];
                string argName = "action=";
                if (arg.ToLower().StartsWith(argName))
                {
                    action = arg.Substring(argName.Length).ToLower();
                }
                arg = args[index];
                argName = "files=";
                if (arg.ToLower().StartsWith(argName))
                {
                    fileFiles = arg.Substring(argName.Length);
                }
                argName = "find_replace=";
                if (arg.ToLower().StartsWith(argName))
                {
                    fileFindReplace = arg.Substring(argName.Length);
                }
                argName = "write=";
                if (arg.ToLower().StartsWith(argName))
                {
                    bool.TryParse(arg.Substring(argName.Length), out write);
                }
                argName = "backup=";
                if (arg.ToLower().StartsWith(argName))
                {
                    bool.TryParse(arg.Substring(argName.Length), out backup);
                }
                index++;
            }
            switch (action)
            {
                case "findreplaceinfiles":
                    Utile.FindReplaceInFiles(fileFiles, fileFindReplace, write, backup);
                    break;
            }
        }
    }
}
