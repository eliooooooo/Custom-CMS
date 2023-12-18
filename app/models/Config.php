<?php
include_once __DIR__.'./../../utils/config.php';

class Config {
    private static $configs = [];

    public function __construct() {
      $this->config = Config::get();
    }

    /**
     * Get the config file array.
     * 
     * @param $config
     * @param $prefix
     */
    public static function set($config, $prefix = ''){
      foreach ($config as $key => $value) {
        if (is_array($value)) {
          self::set($value, $prefix . $key . '_');
        } else {
          self::$configs[$prefix . $key] = $value;
        }
      }
    }

    /**
     * Get the config value.
     * 
     * @return array
     */
    public static function get(){
      return self::$configs;
    }

    /**
     * Get the specific config value.
     * 
     * @param $key
     * @return string
     */
    public function getSpecific($key){
      return self::$configs[$key];
    }
}
