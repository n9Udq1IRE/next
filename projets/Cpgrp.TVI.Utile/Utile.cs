using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Text.RegularExpressions;

namespace ConsoleApplicationRainettes
{
    public class Utile
    {

        /// <summary>
        /// 
        /// </summary>
        /// <param name="fileFiles"></param>
        /// <param name="fileFindReplace"></param>
        public static void FindReplaceInFiles(string fileFiles, string fileFindReplace, bool write = false, bool backup = false)
        {
            try
            {
                if (File.Exists(fileFiles) && File.Exists(fileFindReplace))
                {
                    string repBackup = DateTime.Now.ToString("yyyyMMddHHmmss");
                    List<string> listFiles = new List<string>();
                    List<string> listFind = new List<string>();
                    List<string> listReplace = new List<string>();
                    string[] lignes = GetContentFile(fileFiles).Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (string ligne in lignes)
                    {
                        if (File.Exists(ligne))
                        {
                            listFiles.Add(ligne);
                            if (backup)
                            {
                                string fileBackup = String.Format("backup\\{0}\\in\\{1}", repBackup, ligne.Replace(":\\", "\\"));
                                Directory.CreateDirectory(fileBackup.Substring(0, fileBackup.LastIndexOf('\\')));
                                File.Copy(ligne, fileBackup);
                            }
                        }
                        else
                        {
                            log("W", String.Format("File not exist : {0}", ligne));
                        }
                    }
                    lignes = GetContentFile(fileFindReplace).Split(new string[] { "\r\n" }, StringSplitOptions.RemoveEmptyEntries);
                    foreach (string ligne in lignes)
                    {
                        string[] findReplace = ligne.Split('\t');
                        if (findReplace.Length == 2)
                        {
                            listFind.Add(findReplace[0]);
                            listReplace.Add(findReplace[1]);
                        }
                        else
                        {
                            log("W", String.Format("File format : <find>\\t<replace>\\r\\n INCORRECT : {0}", ligne));
                        }
                    }
                    // Traitement
                    foreach (string file in listFiles)
                    {
                        List<int> listCount = new List<int>();
                        string content = GetContentFile(file);
                        int index = 0;
                        while (index < listFind.Count && index < listReplace.Count)
                        {
                            string contentTemp = Regex.Replace(content, listFind[index], listReplace[index], RegexOptions.IgnoreCase);
                            if (contentTemp != content)
                            {
                                listCount.Add(1);
                            }
                            else
                            {
                                listCount.Add(0);
                            }
                            content = contentTemp;
                            index++;
                        }
                        if (write)
                        {
                            SetContentFile(file, content);
                            if (backup)
                            {
                                string fileBackup = String.Format("backup\\{0}\\out\\{1}", repBackup, file.Replace(":\\", "\\"));
                                Directory.CreateDirectory(fileBackup.Substring(0, fileBackup.LastIndexOf('\\')));
                                File.Copy(file, fileBackup);
                            }
                        }
                        string count = "";
                        index = 0;
                        while (index < listCount.Count)
                        {
                            count += "\t" + listCount[index].ToString();
                            index++;
                        }
                        log("I", String.Format("{0}\t{1}", file, count));
                    }
                }
                else
                {
                    log("W", String.Format("File not exist : {0}", fileFiles));
                    log("W", "OR");
                    log("W", String.Format("File not exist : {0}", fileFindReplace));
                    showHelp("findreplaceinfiles");
                }
            }
            catch (Exception e)
            {
                logException(e);
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        private static string GetContentFile(string file)
        {
            string content = "";

            try
            {
                if (File.Exists(file))
                {
                    StreamReader sr = new StreamReader(file);
                    content = sr.ReadToEnd();
                    sr.Close();
                    sr.Dispose();
                }
                else
                {
                    log("W", String.Format("File does not exist : {0}", file));
                }
            }
            catch (Exception e)
            {
                logException(e);
            }

            return content;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="file"></param>
        /// <param name="content"></param>
        private static void SetContentFile(string file, string content)
        {
            try
            {
                StreamWriter sw = new StreamWriter(file, false);
                sw.Write(content);
                sw.Close();
                sw.Dispose();
            }
            catch (Exception e)
            {
                logException(e);
            }

            return;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="function"></param>
        private static void showHelp(string function)
        {
            switch (function)
            {
                case "findreplaceinfiles":
                    log("I", "PROGRAM files=<files> find_replace=<find_replace>");
                    log("I", "  <files> : file of files");
                    log("I", "    File format : <fullpath_file>\\r\\n");
                    log("I", "  <find_replace> : file of string to replace");
                    log("I", "    File format : <find>\\t<replace>\\r\\n");
                    break;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="e"></param>
        private static void logException(Exception e)
        {
            log("E", String.Format("Exception.Source : {0}", e.Source));
            log("E", String.Format("Exception.Message : {0}", e.Message));
            log("E", String.Format("Exception.Data : {0}", e.Data));
            log("E", String.Format("Exception.HelpLink : {0}", e.HelpLink));
            log("E", String.Format("Exception.StackTrace : {0}", e.StackTrace));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type"></param>
        /// <param name="msg"></param>
        private static void log(string type, string msg)
        {
            DateTime now = DateTime.Now;

            Console.WriteLine(String.Format("{0}\t{1}\t{2}", type, now.ToString("dd/MM/yyyy HH:mm:ss"), msg));
        }

    }
}
